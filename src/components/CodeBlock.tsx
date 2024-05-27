import React from 'react';
import {
    Box,
    BoxProps,
    IconButton,
    Code,
    Text,
    useClipboard
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';


interface CodeBlockProps extends BoxProps {
    title?: string
}

const CodeBlock = ({ title, children, ...props }: CodeBlockProps) => {
    const textInsideChildren = typeof children === 'string' ? children : '';
    const { hasCopied, onCopy } = useClipboard(textInsideChildren, 1000);

    return (
        <Box
            position="relative"
            maxWidth='100%'
            {...props}
        >
            <Text
                top={4}
                as='b'
                left='50%'
                transform='translateX(-50%)'
                position='absolute'
                fontSize='sm'
            >
                {title}
            </Text>

            <IconButton
                top={2}
                right={2}
                position='absolute'
                aria-label="Copy to clipboard"
                title="Copy to clipboard"
                icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                onClick={onCopy}
                colorScheme={hasCopied ? 'green' : 'blue'}
                size="sm"
            />

            <Code
                display='block'
                colorScheme='blue'
                whiteSpace='pre'
                overflowX='auto'
                padding={4}
            >
                <Box marginTop={10}>{children}</Box>
            </Code>
        </Box>
    );
};

export default CodeBlock;