import React, { useState } from 'react';
import {
    Flex,
    Heading,
    Link,
    Text,
    Card,
    CardProps,
    CardBody,
    IconButton,
    Button,
    Tag,
    Wrap,
    WrapItem,
    Spacer,
    useBreakpointValue
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import Publication from '../types/Publication';

import Img from './Img';
import StrongDivider from './StrongDivider';
import CodeBlock from './CodeBlock';


interface PublicationCardProps extends CardProps {
    publication: Publication;
}

const PublicationCard = ({ publication, ...props }: PublicationCardProps) => {
    const [showAbstract, setShowAbstract] = useState(false);
    const [showBibtex, setShowBibtex] = useState(false);
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    const authors = publication.authors.map((author, index) => (
        <span key={index}>
            {author.tag === '@me' ? (
                <strong><u>{author.name}</u></strong>
            ) : author.website ? (
                <Link href={author.website} isExternal color="teal.500" textDecoration="underline dashed">
                    {author.name}
                </Link>
            ) : (
                <span>{author.name}</span>
            )}
            {index < publication.authors.length - 1 && ', '}
        </span>
    ));

    const links = [
        { label: 'arXiv', href: publication.arxiv },
        { label: 'PDF', href: publication.pdf },
        { label: 'PUBLISHER', href: publication.url },
        { label: 'WEBSITE', href: publication.website },
    ].filter(link => link.href);

    const publishedDate = new Date(publication.published);
    const publishedMonth = publishedDate.toLocaleString('en-US', { month: 'long' });

    return (
        <Card variant="outline" {...props}>
            <CardBody>
                <Flex direction={isSmallScreen ? 'column' : 'row'}>
                    <Img
                        isInteractive
                        image={publication.image}
                        alt={publication.title}
                        width='full'
                        height={isSmallScreen ? "200px" : "150px"}
                        maxQuality={360}
                        maxWidth={isSmallScreen ? "full" : "250px"}
                        marginBottom={isSmallScreen ? 4 : 0}
                        marginRight={!isSmallScreen ? 4 : 0}
                    />

                    <Flex width='full'>
                        <Flex direction="column" flex="1">
                            <Heading as="h3" size="md">
                                {publication.title}
                            </Heading>
                            <Text>
                                {authors}
                            </Text>
                            <Text>
                                <i>{publication.journal}</i>, <i>{publication.doi}</i>, {publishedMonth}{' '}
                                {publishedDate.getFullYear()}
                            </Text>

                            <Spacer />

                            <Wrap marginTop={2} gridGap={3}>
                                {publication.tags.map((tag, index) => (
                                    <WrapItem key={index}>
                                        <Tag size="md" colorScheme='blue'>
                                            {tag}
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>

                            <Spacer />

                            <Flex marginTop={3} flexWrap="wrap" gridGap={2} >
                                {links.map((link, index) => (
                                    <Button key={index} size="sm" as={Link} href={link.href} isExternal variant="outline">
                                        {link.label}
                                    </Button>
                                ))}
                                {publication.bibtex && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        colorScheme={showBibtex ? 'teal' : 'gray'}
                                        onClick={() => setShowBibtex(!showBibtex)}>
                                        BibTeX
                                    </Button>
                                )}
                            </Flex>
                        </Flex>

                        <IconButton
                            aria-label="Toggle abstract"
                            title="Toggle abstract"
                            icon={showAbstract ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={() => setShowAbstract(!showAbstract)}
                            marginLeft={2}
                        />
                    </Flex>
                </Flex>

                {showAbstract && (
                    <>
                        <StrongDivider marginY={5} />
                        <Text
                            marginTop={2}
                            whiteSpace="pre-line"
                            textAlign='justify'>
                            {publication.abstract}
                        </Text>
                    </>
                )}

                {showBibtex && (
                    <>
                        <StrongDivider marginY={5} />
                        <CodeBlock title='BibTeX CITATION'>{publication.bibtex}</CodeBlock>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default PublicationCard;