import React from 'react';
import SidebarWithHeader from "../components/Sidebar";
import {Box, Button, Container, Flex, Grid, GridItem, SimpleGrid} from "@chakra-ui/react";
import Post from "../components/Post";

function Flow(props) {
return (

                <SimpleGrid  ml={{md:'7rem',lg:'15rem'}}  spacingX={3} columns={9}>
                    <GridItem colStart={1} colEnd={7}><Post/></GridItem>
                    <GridItem colStart={7} colEnd={9}><Post/></GridItem>
                </SimpleGrid>

    );
}

export default Flow;