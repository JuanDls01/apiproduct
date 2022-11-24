import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

type environmentVariablesType = {
    PORT?: number;
    DB_NAME?: string;
    DB_DIALECT?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
}

const environmentVariables: environmentVariablesType = {
    PORT: Number(process.env.PORT) || 3001,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME || 'postgres',
    DB_USER: `${process.env.DB_USER}`,
    DB_PASSWORD: `${process.env.DB_PASSWORD}`,
}

export default environmentVariables;