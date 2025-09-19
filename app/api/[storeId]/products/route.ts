import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        const { searchParams } = new URL(request.url);
        
        // Build query string for dashboard API
        const queryString = searchParams.toString();
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/products${queryString ? `?${queryString}` : ''}`;
        
        // Connect to the real dashboard API
        const response = await fetch(dashboardUrl);
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to fetch products from dashboard' },
                { status: response.status }
            );
        }
        
        const products = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products from dashboard:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products from dashboard' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        const body = await request.json();
        
        // Create new product
        const newProduct = {
            id: `product-${Date.now()}`,
            name: body.name,
            price: body.price,
            category: body.category,
            isFeatured: body.isFeatured || false,
            size: body.size,
            color: body.color,
            images: body.images || [],
            storeId: storeId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // In a real app, you would save to database here
        mockProducts.push(newProduct);
        
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
