import React from "react";
import type { GatsbyBrowser } from "gatsby";
import { WrapRootElement, WrapPageElement } from "./src/provider";


export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
   <WrapRootElement element={element} />
);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
   const langInfo: any = props.pageContext.i18n;

   return (
      <WrapPageElement element={element} lang={langInfo.language} />
   );
};