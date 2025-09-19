import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        
        // Connect to the real dashboard API
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/sizes`;
        const response = await fetch(dashboardUrl);
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to fetch sizes from dashboard' },
                { status: response.status }
            );
        }
        
        const sizes = await response.json();
        return NextResponse.json(sizes);
    } catch (error) {
        console.error('Error fetching sizes from dashboard:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sizes from dashboard' },
            { status: 500 }
        );
    }
}
