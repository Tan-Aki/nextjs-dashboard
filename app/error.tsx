'use client';

import { useEffect } from 'react';

// Handling errors for all nested pages unless they have their own error.js/not-found.js
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.dir(error);
        console.log(error.digest);
    }, [error]);

    // Cannot handle  404/not found errors here, because we are the root /app folder ? So a specific /app/not-found.tsx file is needed to handle 404/not-found errors

    return (
        <main className='flex h-screen flex-col items-center justify-center'>
            <h2 className='text-center'>Something went wrong!</h2>
            <button
                className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}
