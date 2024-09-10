import Author from "./Author";
import ImgType from "./ImgType";


export default interface Publication {
    title: string;
    published: string;
    journal: string;
    doi: string;
    authors: Author[];
    abstract: string;
    image: ImgType;
    pdf: string;
    links: { name: string, link: string }[];
    bibtex: string;
    keywords: string[];
};