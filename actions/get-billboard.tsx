import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard | null> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    const dashboardUrl = `http://localhost:3000/api/public/${storeId}/billboards/${id}`;
    
    console.log(`🔍 Fetching billboard with ID: ${id}`);
    console.log(`🔗 Dashboard URL: ${dashboardUrl}`);
    
    try {
        const res = await fetch(dashboardUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`📊 Response status: ${res.status} ${res.statusText}`);
        
        if (!res.ok) {
            console.error(`❌ Billboard API error: ${res.status} ${res.statusText}`);
            return null;
        }
        
        const data = await res.json();
        console.log('✅ Billboard loaded directly from dashboard:', data);
        return data;
    } catch (error) {
        console.error('❌ Error fetching billboard from dashboard:', error);
        return null;
    }
}

export default getBillboard;