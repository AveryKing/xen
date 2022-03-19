import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue, Image,
} from '@chakra-ui/react';

export default function Post() {
    return (
        <Center py={6}>
            <Box  mt='3.5rem'

                w={'100%'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Stack>
                    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar

                            alt={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>Avery King</Text>
                            <Text color={'gray.500'}>Mar 19, 2022</Text>
                        </Stack>
                    </Stack>
                    <Text
                        fontSize={'15'}
                        color={'gray.500'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                        et ea rebum.
                    </Text>
                </Stack>

            </Box>
        </Center>
    );
}