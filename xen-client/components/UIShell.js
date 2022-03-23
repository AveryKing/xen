import React, {ReactNode} from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, useBreakpointValue,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';

import {IconType} from 'react-icons';
import {ReactText} from 'react';
import {GiYinYang} from "react-icons/gi";
import {IoIosNotificationsOutline} from "react-icons/io";
import {motion} from "framer-motion";
import {useAuth} from "@/lib/auth";

const LinkItems = [
    {name: 'Flow', icon: FiHome},
    {name: 'Trending', icon: FiTrendingUp},
    {name: 'Explore', icon: FiCompass},
    {name: 'Saved', icon: FiStar},
    {name: 'Settings', icon: FiSettings},
];

export default function UIShell({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" position='fixed'>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}


const SidebarContent = ({onClose, ...rest}) => {
    return (
        <Box

            zIndex={20000}
            bg={useColorModeValue('white', 'white')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.200')}
            w={{base: 'full', md: '10%', lg: '15%'}}
            pos="fixed"
            color={'black'}
            h="full"
            {...rest}>
            <Flex h="20" className='select-none' alignItems="center" mx="8">

                <Icon
                    sx={{color: '#ED64A6'}}
                    as={GiYinYang}
                    textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                    fontFamily={'heading'}
                    fontSize={35}
                    color={useColorModeValue('gray.800', 'gray.800')}>

                </Icon> &nbsp;
                <Text
                    display={{md:'none', lg:'block'}}

                    fontSize="3xl" color={'black'} fontFamily="Merienda" fontWeight="bold">
                    Xen
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    <Text
                        display={{base: 'none', md: "none", lg: 'block'}}>{link.name}</Text>
                </NavItem>
            ))}
        </Box>
    );
};


const NavItem = ({icon, children, ...rest}) => {
    return (
        <Link href="#" style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'pink.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize={{base: 16, md: 25, lg: 16}}
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};


const MobileNav = ({onOpen, ...rest}) => {
    const auth = useAuth();
    return (
        <Flex
            ml={{base: 0, md: "10%", lg: '15%'}}
            px={{base: 4, md: 4}}
            height="3.5rem"
            alignItems="center"
            position='fixed'
            width={{base: '100%', md: '90%', lg: '85%'}}
            bg={useColorModeValue('white', 'white')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.200')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />

                <Flex alignItems={'center'}>
                    <Menu>

                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                                className='flex items-center space-x-1 -mr-5 md:mr-0'>
                                <IoIosNotificationsOutline
                                    className='mr-5 hover:scale-110 hover:bg-pink-50 rounded-full hover:cursor-pointer w-10' size={30}/>
                                <div
                                    className='hover:cursor-pointer px-4 py-0 h-10 rounded-full items-center space-x-1 flex hover:bg-pink-50'>
                                    <img src={auth.user.photoUrl}
                                         alt={auth.user.name}
                                         className='w-8 rounded-full'/>
                                    <p>{auth.user.name}</p>
                                    <FiChevronDown size={24}/>
                                </div>
                            </motion.div>
                        </MenuButton>

                        <MenuList
                            bg={useColorModeValue('white', 'white')}
                            borderColor={useColorModeValue('gray.200', 'gray.200')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider/>
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>


    );
};