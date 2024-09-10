import React from "react";
import {
    VStack,
    StackProps,
} from '@chakra-ui/react';

import NavBar from "./NavBar";
import Footer from "./Footer";


interface PageProps extends StackProps {
    isIndex?: boolean;
}

const Page = ({ isIndex, ...props }: PageProps) => (
    <VStack
    alignItems='center'
    >
        <NavBar showHomepage={!isIndex} />

        <VStack
            paddingTop='5rem'
            paddingX='15px'
            maxWidth='1200px'
            {...props}
        />

        <Footer />
    </VStack>
);

export default Page;