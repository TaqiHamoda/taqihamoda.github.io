import { useI18next } from 'gatsby-plugin-react-i18next';

import Schema from "../types/Schema";


export default function parseSchema(schema: Schema, objs: any[]): any[] {
    const { language } = useI18next();

    const result: any[] = objs.map((obj) => {
        const parsed_obj: any = {};

        for (const key in obj) {
            if (schema.locale_properties.has(key)) {
                for (const elm of obj[key]){
                    if (elm[0] === language) {
                        parsed_obj[key] = elm.length == 2 ? elm[1] : elm.slice(1);
                        break;
                    }
                }
            } else {
                parsed_obj[key] = obj[key];
            }
        }

        return parsed_obj;
    });

    return result;
}
