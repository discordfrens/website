import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

//@ts-ignore
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
//@ts-ignore
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

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
            <Component {...pageProps} />
        </SessionContextProvider>
    );
}

export default MyApp;
