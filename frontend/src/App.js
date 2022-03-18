import React from 'react';
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
