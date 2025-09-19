import { Product } from "@/types";
import qs from "query-string";

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const baseUrl = `http://localhost:3000/api/public/${storeId}/products`;
    
    try {
        const url = qs.stringifyUrl({
            url: baseUrl,
            query: {
                categoryId: query.categoryId,
                colorId: query.colorId,
                sizeId: query.sizeId,
                isFeatured: query.isFeatured,
            }
        });
        
        const res = await fetch(url, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            console.error(`Products API error: ${res.status} ${res.statusText}`);
            return [];
        }
        
        const data = await res.json();
        console.log('✅ Products loaded directly from dashboard');
        return data;
    } catch (error) {
        console.error('Error fetching products from dashboard:', error);
        return [];
    }
}

   


export default getProducts;