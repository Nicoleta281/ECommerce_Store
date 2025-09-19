import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        
        // Try to connect to dashboard API with different approaches
        let categories = null;
        
        // Connect to dashboard public API
        try {
            const dashboardUrl = `http://localhost:3000/api/public/${storeId}/categories`;
            console.log(`Connecting to dashboard: ${dashboardUrl}`);
            
            const response = await fetch(dashboardUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Frontend-Store/1.0'
                }
            });
            
            console.log(`Dashboard response status: ${response.status}`);
            
            if (response.ok) {
                categories = await response.json();
                console.log('Successfully fetched categories from dashboard');
            } else {
                console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error connecting to dashboard:', error);
        }
        
        // If all approaches fail, return error
        if (!categories) {
            return NextResponse.json(
                { error: 'Cannot connect to dashboard API. Please ensure dashboard is running and accessible.' },
                { status: 503 }
            );
        }
        
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories from dashboard:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories from dashboard' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        const body = await request.json();
        
        // Forward the request to dashboard public API
        const dashboardUrl = `http://localhost:3000/api/public/${storeId}/categories`;
        const response = await fetch(dashboardUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Frontend-Store/1.0'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            console.error(`Dashboard API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to create category in dashboard' },
                { status: response.status }
            );
        }
        
        const newCategory = await response.json();
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('Error creating category in dashboard:', error);
        return NextResponse.json(
            { error: 'Failed to create category in dashboard' },
            { status: 500 }
        );
    }
}
