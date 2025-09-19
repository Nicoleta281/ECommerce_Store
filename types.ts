export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboardId: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
    billboard?: Billboard; // Billboard-ul poate fi inclus în categoria
};
export interface Product {
    id: string;
    name: string;
    price: string;
    categoryId: string;
    isFeatured: boolean;
    isArchived: boolean;
    sizeId: string;
    colorId: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
    images: Image[];
    category: Category;
    size: Size;
    color: Color;
};
export interface Image {
    id: string;
    url: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
};
export interface Size {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
};
export interface Color {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
};
