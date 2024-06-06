import React from "react";
import type { GatsbySSR } from "gatsby";
import { ColorModeScript } from "@chakra-ui/react";
import { WrapPageElement } from "./src/provider";
import { customTheme } from "./src/theme";


export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={customTheme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
};

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => {
  const langInfo: any = props.pageContext.i18n;

  return (
     <WrapPageElement element={element} lang={langInfo.language} />
  );
};