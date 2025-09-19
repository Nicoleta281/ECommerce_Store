import { Category } from "@/types";

const getCategory = async (id: string): Promise<Category | null> => {
    const storeId = '0c387960-a697-465c-b0af-8128b8cb7fe6';
    
    console.log(`🔍 Fetching category with ID: ${id}`);
    
    try {
        // Dashboard-ul nu are endpoint pentru categorii individuale, 
        // așa că încărcăm toate categoriile și găsim categoria dorită
        const categoriesUrl = `http://localhost:3000/api/public/${storeId}/categories`;
        console.log(`🔗 Dashboard URL: ${categoriesUrl}`);
        
        const res = await fetch(categoriesUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`📊 Categories response status: ${res.status} ${res.statusText}`);
        
        if (!res.ok) {
            console.error(`❌ Categories API error: ${res.status} ${res.statusText}`);
            return null;
        }
        
        const categories = await res.json();
        console.log('✅ Categories loaded from dashboard:', categories);
        
        // Găsește categoria cu ID-ul specificat
        const category = categories.find((cat: Category) => cat.id === id);
        
        if (category) {
            console.log('✅ Found category:', category);
            return category;
        } else {
            console.log(`⚠️ Category with ID ${id} not found`);
            return null;
        }
    } catch (error) {
        console.error('❌ Error fetching categories from dashboard:', error);
        return null;
    }
}

export default getCategory;