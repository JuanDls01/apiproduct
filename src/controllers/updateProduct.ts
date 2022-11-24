import { Request, Response } from "express";
import Product from "../../models/product";

const updateProduct = async (req: Request, res: Response) => {
    const { id, name, price } = req.body as { id?: number, name?: string, price?: number }

    try {
        if (!name && !price)
            throw new Error("Por favor provea algún parametro para modificar");

        const productToUpdate = await Product.findByPk(id);
        if (productToUpdate === null) {
            throw new Error("Producto no encontrado");
        } else {
            if (name) await productToUpdate.update({ name: name });
            if (price) await productToUpdate.update({ price: price });
            await productToUpdate.save();
            res.status(200).json({
                message: `Producto ${productToUpdate.name} actualizado correctamente`,
            });
        }
    } catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
}

export default updateProduct;