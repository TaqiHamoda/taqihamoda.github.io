import { useStaticQuery, graphql } from "gatsby";

import Abstract from "../types/Abstract";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllAbstracts() {
    const abstracts: { [key: string]: Abstract } = {};

    const data = useStaticQuery(graphql`
    query {
        allAbstractsJson {
            nodes {
                doi
                abstract
            }
        }
    }`);

    const schema = getAllSchemas()["abstracts"];
    const parsed_data = parseSchema(schema, data.allAbstractsJson.nodes);

    parsed_data.forEach((abstract: Abstract) => {
        abstracts[abstract.doi] = abstract;
    });

    return abstracts;
}
