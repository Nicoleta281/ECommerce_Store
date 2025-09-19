
import {cn} from "@/lib/utils"
import { MouseEventHandler } from "react";

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactNode;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    icon,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-full flex items-center justify-center bg-white border border-gray-300 shadow-md p-2 hover:scale-110 transition hover:bg-gray-50",
                className
            )}
        >
            {icon}
        </button>
    );
}

export default IconButton;