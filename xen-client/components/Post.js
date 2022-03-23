import React from 'react';
import {Avatar,IconButton} from "@chakra-ui/react";
import {BiComment,BiRepost} from "react-icons/bi";
import {BsHeart, BsHeartFill, BsStar, BsStarFill} from "react-icons/bs";

const Post = () => {
    return (
        <>
            <div className='rounded-lg shadow border w-auto max-w-md  h-auto p-5'>
                <div className='flex items-center space-x-2'>
                    <Avatar className='mt-1' size='sm'/>
                    <div className='block '>
                        <p>Avery King</p>
                        <p className='text-xs'>December 21, 2021</p>
                    </div>


                </div>

                <div className='mx-auto mt-2'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias, praesentium? Cum, deleniti dolorum eius facilis fuga minima mollitia natus necessitatibus odit quaerat quam qui quis rerum suscipit tempore voluptas.</p>
                </div>
                <div className='w-full mt-3 -mb-3 text-sm'>
                <IconButton

                        variant={'ghost'}
                        color='#de2852'
                        icon={<BsHeartFill size={23}/>}
                        aria-label={'heart'}/>
                <IconButton
                    variant={'ghost'}
                    color='#f5c400'
                    icon={<BsStarFill size={25}/>}
                    aria-label={'star'}/>
                <IconButton
                    variant={'ghost'}
                    icon={<BiComment/>}
                    aria-label={'comment'}/>
                    <IconButton
                        variant={'ghost'}

                        fontSize={20}
                        icon={<BiRepost/>}
                        aria-label={'repost'}/>
                </div>
            </div>
        </>
    );
};

export default Post;