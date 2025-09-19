// Environment configuration
export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/public/0c387960-a697-465c-b0af-8128b8cb7fe6'
};

// Validate required environment variables
if (!env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}
