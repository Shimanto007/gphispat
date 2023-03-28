import * as React from "react";
import Document, {Head, Main, NextScript, Html} from "next/document";
import {ServerStyleSheet as StyledComponentSheets} from "styled-components";
import Script from "next/script";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const styledComponentSheet = new StyledComponentSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentSheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>,
                ],
            };
        } finally {
            styledComponentSheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>GPH Ispat Limited</title>
                    <link rel="icon" href="/images/static/favicon.png"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
                          rel="stylesheet"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>

                </body>
            </Html>
        );
    }
}

