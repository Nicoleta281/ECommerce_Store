"use client"
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview";
import useCart from "@/hooks/use-cart";
interface ProductCard {
    data: Product;
}
const ProductCard : React.FC<ProductCard> = ({
    data
}) => {
    console.log('🛍️ ProductCard received data:', data);
    console.log('🛍️ ProductCard data type:', typeof data);
    console.log('🛍️ ProductCard data keys:', data ? Object.keys(data) : 'null');
    
    const cart = useCart();
   const router = useRouter();
   const previewModal = usePreviewModal();
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }
    return(
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4" >
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                {data?.images?.[0]?.url ? (
                    <Image
                        src={data.images[0].url}
                        alt={data.name || "Product image"}
                        fill
                        className="aspect-square object-cover rounded-md"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                    </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600"/>}
                        />
                          <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600"/>}
                        />
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category?.name || "No category"}</p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data.price}/>
            </div>
        </div>
    );
}
export default ProductCard;