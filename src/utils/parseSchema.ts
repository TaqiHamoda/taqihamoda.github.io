import Schema, { SchemaProp } from "../types/Schema";

import getCurrentLanguage from "../data/getCurrentLanguage";
import getDefaultLanguage from "../data/getDefaultLanguage";


function extractLanguageValue(obj: string[]): any {
    if (!obj) {
        return;
    }

    const language = getCurrentLanguage().code;
    const defaultLanguage = getDefaultLanguage().code;

    let defaultValue: any = null;

    for (const elm of obj) {
        if (elm[0] === language) {
            return elm.length == 2 ? elm[1] : elm.slice(1);
        } else if (elm[0] === defaultLanguage) {
            defaultValue = elm.length == 2 ? elm[1] : elm.slice(1);
        }
    }

    return defaultValue;
}

function parseSchemaProp(prop: SchemaProp, obj: any): any {
    if (!obj) {
        return;
    } else if (Array.isArray(obj)) {
        return obj.map((o) => parseSchemaProp(prop, o));
    }

    const parsed_obj: any = {};

    for (const key in prop) {
        if (Object.keys(prop[key]).length > 0) {
            parsed_obj[key] = parseSchemaProp(prop[key], obj[key]);
        } else {
            parsed_obj[key] = extractLanguageValue(obj[key]);
        }
    }

    for (const key in obj) {
        if (!prop[key]) {
            parsed_obj[key] = obj[key];
        }
    }

    return parsed_obj;
}

export default function parseSchema(schema: Schema, objs: any[]): any[] {
    return objs.map((obj) => {
        return parseSchemaProp(schema.locale_properties, obj);
    });
}
