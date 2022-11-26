import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

//@ts-ignore
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
//@ts-ignore
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

import { Syne } from '@next/font/google';

const syne = Syne({ subsets: ['latin'] });

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session;
}>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <main className={syne.className}>
                <Component {...pageProps} />
            </main>
        </SessionContextProvider>
    );
}

export default MyApp;
