import { Request, Response } from "express";
import { Op } from "sequelize";
import Product from "../../models/product";
import Brand from '../../models/brand';

const postProduct = async (req: Request, res: Response) => {
    const { name, brandId, price } = req.body as { name?: string, brandId?: number, price?: number };

    const nameLowerCase = name?.toLocaleLowerCase()

    try {
        if (!name || !brandId || !price)
            throw new Error("Por favor provea todos los datos del productos");
        const [product, created] = await Product.findOrCreate({
            where: {
                [Op.and]: {
                    name: nameLowerCase,
                    brandId: brandId
                }
            },
            include: [Brand],
            defaults: {
                name: nameLowerCase,
                brandId: brandId,
                isActive: true,
                price: price,
            }
        })

        if (!created) throw new Error("El producto que desea crear ya existe")
        res.status(200).json(product)

    } catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
}

export default postProduct;