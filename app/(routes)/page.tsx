import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import Billboard from "@/components/ui/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
export const revalidate = 0;
const HomePage = async () => {
    const products = await getProducts({isFeatured: true});
    
    let billboard = null;
    try {
        // Încarcă categoriile și folosește billboard-ul din prima categorie
        const categories = await getCategories();
        console.log(`🏠 HomePage - Categories loaded:`, categories);
        
        if (categories && categories.length > 0) {
            const firstCategory = categories[0];
            console.log(`🏠 HomePage - First category:`, firstCategory);
            
            if (firstCategory.billboard) {
                billboard = firstCategory.billboard;
                console.log(`✅ HomePage - Using billboard from first category:`, billboard);
            } else {
                console.log(`⚠️ HomePage - First category has no billboard`);
            }
        } else {
            console.log(`⚠️ HomePage - No categories found`);
        }
    } catch (error) {
        console.error('❌ HomePage - Failed to load billboard:', error);
        // billboard remains null, component will show placeholder
    }
    
    return(
       <Container>
        <div className="space-y-10 pb-10">
         <Billboard data={billboard} />
        
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
<ProductList title="Featured Products" items={products} />
        </div>
        </div>
       </Container>
    );
    }
    export default HomePage;