import { NextRequest, NextResponse } from 'next/server';

// Mock data for billboards - replace with real database calls
const mockBillboards = [
    {
        id: "69c88ff9-995a-4c04-9c29-37283915f761",
        label: "test-billboard",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        storeId: "0c387960-a697-465c-b0af-8128b8cb7fe6",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export async function GET(
    request: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        
        // Filter billboards by storeId
        const billboards = mockBillboards.filter(billboard => billboard.storeId === storeId);
        
        return NextResponse.json(billboards);
    } catch (error) {
        console.error('Error fetching billboards:', error);
        return NextResponse.json(
            { error: 'Failed to fetch billboards' },
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
        
        // Create new billboard
        const newBillboard = {
            id: `billboard-${Date.now()}`,
            label: body.label,
            imageUrl: body.imageUrl,
            storeId: storeId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // In a real app, you would save to database here
        mockBillboards.push(newBillboard);
        
        return NextResponse.json(newBillboard, { status: 201 });
    } catch (error) {
        console.error('Error creating billboard:', error);
        return NextResponse.json(
            { error: 'Failed to create billboard' },
            { status: 500 }
        );
    }
}
