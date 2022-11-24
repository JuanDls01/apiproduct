import { Request, Response } from "express";
import Product from "../../models/product";
import { findAndCountAllProducts, findAndFilterProductsByBrand, findAndFilterProductsByName, findProductsDeleted } from "../utils/productFinders";

type findedType = {
    count: number,
    rows: Product[]
}

const getProductsDeleted = async (req: Request, res: Response) => {
    const prodPerPage: number = req.query.prodPerPage ? Number(req.query.prodPerPage) : 5;
    const currentPage: number = req.query.currentPage ? Number(req.query.currentPage) : 1;

    const offset: number = currentPage * prodPerPage - prodPerPage;

    try {
        const { count, rows } = await findProductsDeleted(offset, prodPerPage)

        if (count > 0) {
            const numberOfPages = Math.ceil(count / prodPerPage)

            let pages: number[] = []
            for (let i = 1; i <= numberOfPages; i++) {
                pages.push(i)
            }

            res.status(200).json({ products: rows, pages: pages, totalProducts: count })
        }
        else throw new Error(`No se encontraron productos: ${rows}, ${count}`)
    } catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
}

export default getProductsDeleted