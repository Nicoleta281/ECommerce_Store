import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const dashboardUrl = `http://localhost:3000/api/public/${storeId}/categories`;
    
    console.log(`🔍 Fetching categories from dashboard`);
    console.log(`🔗 Dashboard URL: ${dashboardUrl}`);
    
    try {
        const res = await fetch(dashboardUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`📊 Categories response status: ${res.status} ${res.statusText}`);
        
        if (!res.ok) {
            console.error(`❌ Categories API error: ${res.status} ${res.statusText}`);
            return [];
        }
        
        const data = await res.json();
        console.log('✅ Categories loaded directly from dashboard:', data);
        return data;
    } catch (error) {
        console.error('❌ Error fetching categories from dashboard:', error);
        return [];
    }
}

export default getCategories;