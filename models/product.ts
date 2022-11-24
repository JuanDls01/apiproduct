import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import Brand from './brand';

@Table
class Product extends Model {
    @Column
    name: string;

    @Column
    price: number;

    @Default(true)
    @Column
    isActive: boolean;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;

    @ForeignKey(() => Brand)
    @Column
    brandId: number;

    @BelongsTo(() => Brand)
    brand: Brand;
}


export default Product;