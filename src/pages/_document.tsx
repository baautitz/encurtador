import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br" className="[color-scheme:dark]">
      <Head />    
      <title>vnici.us</title>
      <link rel="icon" href="/favicon.svg" /> 
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
