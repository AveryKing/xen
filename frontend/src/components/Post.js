
import {
    LinkBox,
    LinkOverlay,
    Heading,
    Text,
    VStack,
    Stack,
    useColorModeValue,
    HStack, Avatar,
} from "@chakra-ui/react";
import {Link} from 'react-router-dom'

const BlogPostCard = ({post}) => {
    const hoverBg = useColorModeValue("gray.100", "gray.700");

    return (
        <LinkBox

            boxShadow={useColorModeValue('base','2xl')}
            as="article">
            <VStack
                alignItems="stretch"
                w="full"
                p={{ base: 0, md: 4 }}
                _hover={{
                    bg: hoverBg,
                    transform: "scale(1.025, 1.025)",
                }}
                rounded="md"
                transitionDuration="slow"
                transitionProperty="all"
                transitionTimingFunction="ease-out"
            >
                <VStack alignItems="flex-start">
                    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={post.userImage}
                            alt={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{post.userHandle}</Text>
                            <Text color={'gray.500'}>Mar 18, 2021 </Text>
                        </Stack>
                    </Stack>
                    <HStack
                        divider={
                            <Text mx={2} color="gray.500">

                            </Text>
                        }
                    >
                        <Text color="gray.500" fontSize="sm">

                        </Text>
                        <Text color="gray.500" fontSize="sm">

                        </Text>
                    </HStack>
                </VStack>
                <Text color="gray.500" fontSize="sm">
                    {post.body}

                                    </Text>
            </VStack>
        </LinkBox>
    );
};

export default BlogPostCard;