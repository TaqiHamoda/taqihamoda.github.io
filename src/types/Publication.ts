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
    arxiv: string;
    pdf: string;
    website: string;
    url: string;
    bibtex: string;
    keywords: string[];
};