import type { GatsbyBrowser } from "gatsby";
import { WrapPageElement } from "./src/provider";


export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = WrapPageElement;