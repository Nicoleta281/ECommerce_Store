import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import Fillter from "./components/fillter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-fillters";
export const revalidate = 0;
interface CategoryPageProps {
    params: {
        categoryId: string;
    }
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}
const CategoryPage: React.FC<CategoryPageProps> = async({
    params,
    searchParams
}) => {
    // Await params and searchParams for Next.js 15
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    
    console.log(`🔍 Category Page - Category ID: ${resolvedParams.categoryId}`);
    console.log(`🔍 Category Page - Search Params:`, resolvedSearchParams);
    
    const products = await getProducts({
        categoryId : resolvedParams.categoryId,
        colorId : resolvedSearchParams.colorId,
        sizeId : resolvedSearchParams.sizeId,
    });
    
    console.log(`📦 Products found: ${products.length}`);
    console.log(`📦 Products data:`, products);
    
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(resolvedParams.categoryId);
    
    console.log(`📂 Category data:`, category);
    
    let billboard = null;
    if (category) {
        // Dashboard-ul returnează billboard-ul inclus în categoria
        if (category.billboard) {
            billboard = category.billboard;
            console.log(`✅ Using billboard from category data:`, billboard);
        } else if (category.billboardId) {
            // Fallback: dacă nu e inclus, încearcă să-l încarce separat
            billboard = await getBillboard(category.billboardId);
            console.log(`🖼️ Billboard loaded separately:`, billboard);
        } else {
            console.log(`⚠️ No billboard data found for category`);
        }
    } else {
        console.log(`⚠️ No category data found`);
    }
    return (
        <div className="bg-white">
            <Container>
                <Billboard
                 data={billboard}
                  />
               <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <div className="lg:col-span-4 lg:row-span-full">
                       
<MobileFilters
sizes={sizes}
colors={colors}
/>



                       <div className="hidden lg:block">
                        <Fillter
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}
                        />
                       <Fillter
                            valueKey="colorId"
                            name="Colors"
                            data={colors}
                        />
                       </div>
                       <div className="mt-6 lg:col-span-4 lg:mt-0">
                        {products.length === 0 && <NoResults />}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
{products.map((item) => (
    <ProductCard key={item.id} 
    data={item} />
))}
</div>

                        </div>
                    </div>
                </div>
               </div>
            </Container>
        </div>
     );
}

export default CategoryPage;