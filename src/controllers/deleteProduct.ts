import { Request, Response } from "express";
import Product from "../../models/product";

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params as { id?: string }

    try {
        if (!id) throw new Error("Por favor provea un producto para eliminar");
        const productToDelete: Product | null = await Product.findByPk(Number(id));
        if (productToDelete === null) throw new Error('Producto no encontrado')
        else {
            await productToDelete.update({ isActive: false, deletionDate: new Date() });
            res.status(200).json({
                message: `Producto ${productToDelete.dataValues.name} eliminado correctamente`
            })
        }
    }
    catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
}

export default deleteProduct;