import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import Product from './product';

@Table
class Brand extends Model {
    @Column
    name: string;

    @HasMany(() => Product)
    product: Product[];
}

export default Brand