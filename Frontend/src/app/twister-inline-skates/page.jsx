import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function TwisterInlineSkates() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Twister Inline Skates</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg mb-4">
          Product Coming Soon
        </p>
        
        <div className="mt-6">
          <Link href="/inline-skates" className="text-blue-600 hover:underline">
            ← Back to Inline Skates
          </Link>
        </div>
      </div>
    </div>
  );
}
