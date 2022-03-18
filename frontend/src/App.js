import React from 'react';
impo45 { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <h1>ZenSocial</h1>
    </ChakraProvider>
  );
}

export default App;
