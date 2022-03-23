import React from 'react';
import {Avatar} from "@chakra-ui/react";

const Post = () => {
    return (
        <>
            <div className='rounded-lg shadow border w-auto max-w-md  h-auto p-5'>
                <div className='flex items-center space-x-2'>
                    <Avatar size='sm'/>
                    <p>Avery King</p>
                </div>
                <div className='mx-auto mt-2'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias, praesentium? Cum, deleniti dolorum eius facilis fuga minima mollitia natus necessitatibus odit quaerat quam qui quis rerum suscipit tempore voluptas.</p>
                </div>
                <div className='w-full hover:bg-gray-50 mt-3 -mb-3 text-sm'>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;