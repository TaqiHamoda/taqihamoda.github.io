import React from "react";
import {
  Box,
  Code,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SEO from "../components/SEO";
import Page from "../components/Page";
import LocalizedLink from "../components/LocalizedLink";


interface NotFoundTemplateProps {
  data: any,
  children: any,
  pageContext: any
}

const NotFoundTemplate = ({ data, children, pageContext }: NotFoundTemplateProps) => {
  const { t } = useTranslation();

  return (
    <Page>
      <Box p={24} fontFamily="-apple-system, Roboto, sans-serif, serif">
        <Heading as="h1" mt={0} mb={16} maxW="container.sm">
          {t("404_heading")}
        </Heading>
        <Text mb={12}>
          {t("404_text")}
          <br />
          {process.env.NODE_ENV === "development" ? (
            <>
              <br />
              Try creating a page in{" "}
              <Code colorScheme="yellow" p={1} fontSize="lg" borderRadius="base">
                src/pages/
              </Code>
              .
              <br />
            </>
          ) : null}
          <br />
          <Button>
            <LocalizedLink to="/">
              {t("404_home")}
            </LocalizedLink>
          </Button>
        </Text>
      </Box>
    </Page>
  );
};
export default NotFoundTemplate;

export const Head = ({ location, params, data, pageContext }: any) => {
  return (
    <SEO
      langInfo={pageContext.language}
      title={pageContext.frontmatter.title}
      description={pageContext.frontmatter.description}
      path={location.pathname}
    />
  );
};
