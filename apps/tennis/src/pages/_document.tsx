import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { Toaster } from 'src/components/Toaster';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <Main />
        <Toaster />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
