import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import environmentVariables from '../config';
import Brand from "../models/brand";
import Product from "../models/product";

dotenv.config({ path: `../${__dirname}/.env` });

console.log(__dirname)

const sequelize = new Sequelize({
    database: environmentVariables.DB_NAME,
    dialect: 'postgres',
    username: environmentVariables.DB_USER,
    password: environmentVariables.DB_PASSWORD,
    storage: ':memory:',
    models: [Brand, Product],
});

export default sequelize