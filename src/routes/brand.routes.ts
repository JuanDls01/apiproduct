import { Router } from 'express';
import Brand from '../../models/brand';
const brandRoute = Router();

brandRoute.post('/', async (req, res) => {
    const { name } = req.body as { name: string };
    const nameLowerCase = name.toLowerCase()
    try {
        if (!name) throw new Error("Por favor provea el nombre de la marca")
        const [brand, created] = await Brand.findOrCreate({
            where: { name: nameLowerCase },
            defaults: { name: nameLowerCase }
        })
        if (!created) throw new Error("La marca ya existe");
        res.status(200).json(brand)
    } catch (err) {
        if (err instanceof Error) res.status(400).json({ message: err.message })
        else res.status(400).json({ error: err, message: 'Unexpected error' })
    }
})

export default brandRoute