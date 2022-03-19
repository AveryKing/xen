import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {Box, Button, Container, Flex, Grid, GridItem, SimpleGrid} from "@chakra-ui/react";
import Post from "../components/Post";

function Flow(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://us-central1-zensocial-501c5.cloudfunctions.net/api/posts')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    },[])

    return (
        <SimpleGrid ml={{md: '7rem', lg: '15rem'}} spacingX={3} columns={9}>
            {posts.map(x =>  <GridItem colStart={1} colEnd={7}><Post/></GridItem>)}
            <GridItem colStart={7} colEnd={9}><Post/></GridItem>
        </SimpleGrid>

    );
}

export default Flow;