import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@main/css/iconoir.css"
                />
                <script src="https://kit.fontawesome.com/d3f58eda4f.js" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
