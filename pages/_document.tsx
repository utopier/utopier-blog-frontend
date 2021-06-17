import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

//_document
// - html
// 	- lang
// - link
// 	- script
// 	- stylesheet
// 	- icon
// 	- font
// 	- manifest
// - meta
// 	- charset
// 	- theme-color

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="utopier devBlog" />
          <link rel="apple-touch-icon" href="/images/icons/icon-152x152.png" />
          <meta name="theme-color" content="#2F3BA2" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />{' '}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/install.js"></script>
          <script src="/notification.js"></script>
          {/* <script src="/push.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
