import { ColorModeScript } from '@chakra-ui/color-mode'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
//import theme from './theme'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                {/* 👇 Here's the script */}
                <ColorModeScript initialColorMode={'light'} />
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}