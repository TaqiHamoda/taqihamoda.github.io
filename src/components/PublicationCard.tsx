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
import { useTranslation } from 'react-i18next';

import getCurrentLanguage from '../data/getCurrentLanguage';

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

    const { t } = useTranslation();

    const langInfo = getCurrentLanguage();
    const comma = langInfo.langDir === 'ltr' ? ',' : '،';

    const authors = publication.authors.map((author, index) => (
        <span key={index}>
            {author.tag === '@me' ? (
                <strong><u>{author.name}</u></strong>
            ) : author.website ? (
                <Link href={author.website} isExternal color="teal.500">
                    {author.name}
                </Link>
            ) : (
                <span>{author.name}</span>
            )}
            {index < publication.authors.length - 1 && `${comma} `}
        </span>
    ));

    const links = [
        { label: t('pub_arxiv'), href: publication.arxiv },
        { label: t('pub_pdf'), href: publication.pdf },
        { label: t('pub_publisher'), href: publication.url },
        { label: t('pub_website'), href: publication.website },
    ].filter(link => link.href);

    const publishedDate = new Date(publication.published);
    const publishedMonth = publishedDate.toLocaleString(langInfo.hrefLang, { month: 'long' });
    const publishedYear = publishedDate.toLocaleString(langInfo.hrefLang, { year: 'numeric' });

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
                        marginEnd={!isSmallScreen ? 4 : 0}
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
                                <i>{publication.journal}</i>{comma} <i>{publication.doi}</i>{comma} {publishedMonth}{' '}
                                {publishedYear}
                            </Text>

                            <Spacer />

                            <Wrap marginTop={2} gridGap={3}>
                                {publication.keywords.map((keyword, index) => (
                                    <WrapItem key={index}>
                                        <Tag size="md" colorScheme='blue'>
                                            {keyword}
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
                                        {t('pub_bibtex')}
                                    </Button>
                                )}
                            </Flex>
                        </Flex>

                        <IconButton
                            aria-label={t('pub_abstract') as string}
                            title={t('pub_abstract') as string}
                            icon={showAbstract ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={() => setShowAbstract(!showAbstract)}
                            marginStart={2}
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
                        <CodeBlock title={t('pub_citation') as string}>{publication.bibtex}</CodeBlock>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default PublicationCard;