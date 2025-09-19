import { Size } from "@/types";

const getSizes = async (): Promise<Size[]> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const dashboardUrl = `http://localhost:3000/api/public/${storeId}/sizes`;
    
    try {
        const res = await fetch(dashboardUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            console.error(`Sizes API error: ${res.status} ${res.statusText}`);
            return [];
        }
        
        const data = await res.json();
        console.log('✅ Sizes loaded directly from dashboard');
        return data;
    } catch (error) {
        console.error('Error fetching sizes from dashboard:', error);
        return [];
    }
}

export default getSizes;