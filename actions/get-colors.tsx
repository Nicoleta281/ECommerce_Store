import { Color } from "@/types";

const getColors = async (): Promise<Color[]> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const dashboardUrl = `http://localhost:3000/api/public/${storeId}/colors`;
    
    try {
        const res = await fetch(dashboardUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            console.error(`Colors API error: ${res.status} ${res.statusText}`);
            return [];
        }
        
        const data = await res.json();
        console.log('✅ Colors loaded directly from dashboard');
        return data;
    } catch (error) {
        console.error('Error fetching colors from dashboard:', error);
        return [];
    }
}

export default getColors;