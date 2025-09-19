import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string; billboardId: string }> }
) {
    try {
        const { storeId, billboardId } = await params;
        
        // Connect to the real dashboard API
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/billboards/${billboardId}`;
        const response = await fetch(dashboardUrl);
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to fetch billboard from dashboard' },
                { status: response.status }
            );
        }
        
        const billboard = await response.json();
        return NextResponse.json(billboard);
    } catch (error) {
        console.error('Error fetching billboard from dashboard:', error);
        return NextResponse.json(
            { error: 'Failed to fetch billboard from dashboard' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string; billboardId: string }> }
) {
    try {
        const { storeId, billboardId } = await params;
        const body = await request.json();
        
        // Connect to the real dashboard API
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/billboards/${billboardId}`;
        const response = await fetch(dashboardUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to update billboard in dashboard' },
                { status: response.status }
            );
        }
        
        const updatedBillboard = await response.json();
        return NextResponse.json(updatedBillboard);
    } catch (error) {
        console.error('Error updating billboard:', error);
        return NextResponse.json(
            { error: 'Failed to update billboard' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string; billboardId: string }> }
) {
    try {
        const { storeId, billboardId } = await params;
        
        // Connect to the real dashboard API
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/billboards/${billboardId}`;
        const response = await fetch(dashboardUrl, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to delete billboard from dashboard' },
                { status: response.status }
            );
        }
        
        return NextResponse.json({ message: 'Billboard deleted successfully' });
    } catch (error) {
        console.error('Error deleting billboard:', error);
        return NextResponse.json(
            { error: 'Failed to delete billboard' },
            { status: 500 }
        );
    }
}
