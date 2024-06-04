import Schema from "../types/Schema";

export default function parseSchema(schema: Schema, objs: any[]): any {
    const result: any[] = objs.map((obj) => {
        const parsed_obj: any = {};

        for (const key in obj) {
            if (schema.locale_properties.has(key)) {
                parsed_obj[key] = {};

                obj[key].forEach((elm: [string, any]) => {
                    parsed_obj[key][elm[0]] = elm.length == 2 ? elm[1] : elm.slice(1);
                });
            } else {
                parsed_obj[key] = obj[key];
            }
        }

        return parsed_obj;
    });

    return result;
}
