import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    GridItem,
    Container, Image, Text,
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';
import React from "react";

const Feature = ({ heading, text }) => {
    return (
        <GridItem>
            <chakra.h3 fontSize="xl" fontWeight="600">
                {heading}
            </chakra.h3>
            <chakra.p>{text}</chakra.p>
        </GridItem>
    );
};

export default function CallToAction() {
    return (
        <Box as={Container} maxW="7xl" mt={14} p={4}>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                }}
                gap={4}>
                <GridItem colSpan={1}>
                    <VStack mt={2} alignItems="center" spacing="20px">
                        <Text textAlign='center' fontSize="3vw" fontWeight="700">
                           Find Your Flow
                        </Text><Text textAlign='center'>
                        Tired of mindlessly scrolling on platforms such as Facebook and Twitter? Here at Xen, you can explore content that will actively stimulate and engage your mind.<br/> Create a free account now to and make meaningful connections and mindfully <i>flow</i>.
                    </Text>
                        <Button colorScheme="gray" size="md">
                            Join Now
                        </Button>
                    </VStack>
                </GridItem>
                <GridItem>
                    <Flex my={-5}>
                        <Image w={450}src='assets/svg1.svg'/>
                    </Flex>
                </GridItem>
            </Grid>
            <Divider mt={12} mb={12} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
                gap={{ base: '8', sm: '12', md: '16' }}>
                <Feature
                    heading={'Transcend Your Network'}
                    text={'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa,'}
                />
                <Feature
                    heading={'Stay in Touch'}
                    text={'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa,'}
                />
                <Feature
                    heading={'Deepen Your Interests'}
                    text={'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa,'}
                />
                <Feature
                    heading={'Blossom Your Mind'}
                    text={'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa,'}
                />
            </Grid>
        </Box>
    );
}