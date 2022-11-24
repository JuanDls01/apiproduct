import { Request, Response } from "express";
import Product from "../../models/product";
import { findAndCountAllProducts, findAndFilterProductsByBrand, findAndFilterProductsByName } from "../utils/productFinders";

type findedType = {
    count: number,
    rows: Product[]
}

const getProducts = async (req: Request, res: Response) => {
    const name: string | undefined = req.query.name?.toString().toLowerCase();
    const brand: string | undefined = req.query.brand?.toString().toLowerCase();
    const prodPerPage: number = req.query.prodPerPage ? Number(req.query.prodPerPage) : 5;
    const currentPage: number = req.query.currentPage ? Number(req.query.currentPage) : 1;

    const offset: number = currentPage * prodPerPage - prodPerPage;

    try {
        let finded: findedType;
        if (name) {
            finded = await findAndFilterProductsByName(offset, prodPerPage, name)
        }
        else if (brand) {
            finded = await findAndFilterProductsByBrand(offset, prodPerPage, brand)
        }
        else {
            finded = await findAndCountAllProducts(offset, prodPerPage)
        }

        if (finded.count > 0) {
            const numberOfPages = Math.ceil(finded.count / prodPerPage)

            let pages: number[] = []
            for (let i = 1; i <= numberOfPages; i++) {
                pages.push(i)
            }

            res.status(200).json({ products: finded.rows, pages: pages, totalProducts: finded.count })
        }
        else throw new Error(`No se encontraron productos: ${finded.rows}, ${finded.count}`)
    } catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
}

export default getProducts