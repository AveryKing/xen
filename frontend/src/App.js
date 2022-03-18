import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
    ChakraProvider, Container,
    theme,
} from '@chakra-ui/react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flow from './pages/Flow';
import Navbar from './components/Navbar'

function App({loggedIn = false}) {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                { !loggedIn && <Navbar/> }

                <Switch>
                    <Route exact path='/' component={loggedIn ? Flow : Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                </Switch>

            </Router>
        </ChakraProvider>
    );
}

export default App;
