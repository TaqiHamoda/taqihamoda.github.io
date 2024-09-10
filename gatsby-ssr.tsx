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

export const wrapPageElement: GatsbySSR['wrapPageElement'] = WrapPageElement;