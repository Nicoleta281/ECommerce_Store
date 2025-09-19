import { NextRequest, NextResponse } from 'next/server';

// Mock data for categories - replace with real database calls
const mockCategories = [
    {
        id: "cf94c61e-a38c-4398-ae85-da94afd21b00",
        name: "category-test",
        billboardId: "69c88ff9-995a-4c04-9c29-37283915f761",
        storeId: "0c387960-a697-465c-b0af-8128b8cb7fe6",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "new-category-123",
        name: "Noua Categorie",
        billboardId: "69c88ff9-995a-4c04-9c29-37283915f761",
        storeId: "0c387960-a697-465c-b0af-8128b8cb7fe6",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export async function GET(
    request: NextRequest,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    try {
        const { storeId, categoryId } = params;
        
        // Find category by ID and storeId
        const category = mockCategories.find(
            cat => cat.id === categoryId && cat.storeId === storeId
        );
        
        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json(
            { error: 'Failed to fetch category' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    try {
        const { storeId, categoryId } = params;
        const body = await request.json();
        
        // Find category index
        const categoryIndex = mockCategories.findIndex(
            cat => cat.id === categoryId && cat.storeId === storeId
        );
        
        if (categoryIndex === -1) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }
        
        // Update category
        mockCategories[categoryIndex] = {
            ...mockCategories[categoryIndex],
            ...body,
            updatedAt: new Date().toISOString()
        };
        
        return NextResponse.json(mockCategories[categoryIndex]);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    try {
        const { storeId, categoryId } = params;
        
        // Find category index
        const categoryIndex = mockCategories.findIndex(
            cat => cat.id === categoryId && cat.storeId === storeId
        );
        
        if (categoryIndex === -1) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }
        
        // Remove category
        mockCategories.splice(categoryIndex, 1);
        
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        );
    }
}
