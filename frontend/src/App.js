import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
