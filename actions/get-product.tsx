import { Product } from "@/types";

const getProduct = async (id: string): Promise<Product | null> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const dashboardUrl = `http://localhost:3000/api/public/${storeId}/products/${id}`;
    
    try {
        const res = await fetch(dashboardUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            console.error(`Product API error: ${res.status} ${res.statusText}`);
            return null;
        }
        
        const data = await res.json();
        console.log('✅ Product loaded directly from dashboard');
        return data;
    } catch (error) {
        console.error('Error fetching product from dashboard:', error);
        return null;
    }
}

export default getProduct;