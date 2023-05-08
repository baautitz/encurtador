import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br" className="[color-scheme:dark]">
      <Head />    
      <link rel="icon" href="/favicon.svg" /> 
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
