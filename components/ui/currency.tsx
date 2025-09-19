"use client";
import { useState, useEffect } from "react";
export const formatDate = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  interface CurrencyProps {
    value?: string | number;
  }
const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    
    return (
        <span className="font-semibold">
            {formatDate.format(Number(value))}
        </span>
    );
}
export default Currency;