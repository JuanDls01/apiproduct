import { Op } from "sequelize";
import Brand from "../../models/brand";
import Product from "../../models/product";

export const findAndCountAllProducts = async (offset: number, prodPerPage: number) => {
    const finded = await Product.findAndCountAll({
        where: { isActive: true },
        include: {
            model: Brand,
            attributes: ["name"]
        },
        offset: offset,
        limit: prodPerPage,
        attributes: { exclude: ["brandId", "creationDate", "updatedOn", "deletionDate"] }
    });

    return finded
}

export const findAndFilterProductsByBrand = async (offset: number, prodPerPage: number, brand: string) => {
    const finded = await Product.findAndCountAll({
        where: { isActive: true },
        include: {
            model: Brand,
            attributes: ["name"],
            where: { name: { [Op.like]: `%${brand}%` } }
        },
        offset: offset,
        limit: prodPerPage,
        attributes: { exclude: ["brandId", "creationDate", "updatedOn", "deletionDate"] }
    });

    return finded
}

export const findAndFilterProductsByName = async (offset: number, prodPerPage: number, name: string) => {
    const finded = await Product.findAndCountAll({
        where: { name: { [Op.like]: `%${name}%` }, isActive: true },
        include: {
            model: Brand,
            attributes: ["name"]
        },
        offset: offset,
        limit: prodPerPage,
        attributes: { exclude: ["brandId", "creationDate", "updatedOn", "deletionDate"] }
    });

    return finded;
}

export const findProductsDeleted = async (offset: number, prodPerPage: number) => {
    const finded = await Product.findAndCountAll({
        where: { isActive: false },
        include: {
            model: Brand,
            attributes: ["name"]
        },
        offset: offset,
        limit: prodPerPage,
        attributes: { exclude: ["creationDate", "updatedOn", "deletionDate"] }
    })

    return finded;
}

