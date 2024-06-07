import React from 'react';
import {
    Box,
    BoxProps,
    IconButton,
    Code,
    Text,
    Flex,
    useClipboard
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';


interface CodeBlockProps extends BoxProps {
    title?: string;
}

const CodeBlock = ({ title, children, ...props }: CodeBlockProps) => {
    const textInsideChildren = typeof children === 'string' ? children : '';
    const { hasCopied, onCopy } = useClipboard(textInsideChildren, 1000);
    const { t } = useTranslation();

    return (
        <Box
            position="relative"
            maxWidth='100%'
            {...props}
        >
            <Flex
                position="absolute"
                top={0}
                zIndex={1}
                width='100%'
                padding={4}
                justifyContent="space-between"
                alignItems="center"
            >

                <Text as="b" fontSize="sm" color='gray.500'>
                    {title}
                </Text>

                <IconButton
                    aria-label={t('code_clipboard') as string}
                    title={t('code_clipboard') as string}
                    icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                    onClick={onCopy}
                    colorScheme={hasCopied ? 'green' : 'blue'}
                    size="sm"
                />
            </Flex>

            <Code
                display='block'
                colorScheme='blue'
                whiteSpace='pre'
                overflowX='auto'
                padding={4}
                dir='ltr'
            >
                <Box
                marginTop={10}
                >
                    {children}
                </Box>
            </Code>
        </Box>
    );
};

export default CodeBlock;