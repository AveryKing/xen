import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {Box, Button, Grid, Flex, Container, SimpleGrid, GridItem, ListItem, List} from "@chakra-ui/react";
import Post from "../components/Post";

function Flow(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://us-central1-zensocial-501c5.cloudfunctions.net/api/posts')
            .then(res => {
                console.log(res.data)
                setPosts(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    },[])

    return (
        <Container ml={'13rem'}>
            <List zIndex={-1} py={20} w="full" spacing={{ base: 8, md: 7 }}>
                {posts.map((post,index) =><ListItem mt={0}><Post key={index} post={post}/></ListItem>)}
            </List>



        </Container>




    );
}

export default Flow;