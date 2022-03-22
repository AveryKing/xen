import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from "../components/Navbar";
import CallToAction from "../components/CallToAction";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Xen</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
            </Head>
            <Navbar/>
            <CallToAction/>
        </>
    )
}

export default Home
