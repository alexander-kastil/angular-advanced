import { Product } from './product.type';

export type ProductResponse = {
    count: number;
    next: string;
    previous: string;
    results: Product[];
};
