import React from 'react';

const CallToAction = () => {
    return (
        <div className='flex justify-between  items-center bg-pink-50  py-10 lg:py-0'>
            <div className='px-5 lg:px-10 space-y-5 text-center lg:mb-10'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl md:pl-10 '>Find Your Flow</h1>
                <h2 className='lg:text-lg md:pl-10'>Tired of mindlessly scrolling on platforms such as Facebook and Twitter?
                    Here at Xen, you can explore content that will actively stimulate and engage your mind.
                    Create a free account now to make meaningful connections and mindfully flow.</h2>
            </div>
            <img className='hidden md:inline-flex flex-grow p-10 md:w-96 lg:w-11/12 lg:mr-5 object-contain'
                 src="cta.png"
                 alt="Medusa"/>
        </div>
    );
};

export default CallToAction;