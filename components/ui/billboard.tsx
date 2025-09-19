import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
    data: BillboardType | null;
}

const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    console.log('🖼️ Billboard component received data:', data);
    console.log('🖼️ Billboard data type:', typeof data);
    console.log('🖼️ Billboard data keys:', data ? Object.keys(data) : 'null');
    
    // Return a placeholder if no data is provided
    if (!data) {
        console.log('⚠️ Billboard component: No data provided, showing placeholder');
        return (
            <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-lg">No billboard data available</div>
            </div>
        );
    }
    
    console.log('✅ Billboard component: Rendering billboard with data:', data);
    console.log('✅ Billboard imageUrl:', data.imageUrl);
    console.log('✅ Billboard label:', data.label);

    return (
        <div 
className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"        
style={{ 
    backgroundImage: `url(${data.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}}
>
    <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {data.label}
        </div>
    </div>
        </div>
    );
};
export default Billboard;