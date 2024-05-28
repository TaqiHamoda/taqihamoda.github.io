import Author from "./Author";
import ImgType from "./ImgType";

export default interface Publication {
    title: string;
    published: Date;
    journal: string;
    doi: string;
    authors: Author[];
    month: string;
    year: number;
    abstract: string;
    image: ImgType;
    arxiv: string;
    pdf: string;
    website: string;
    url: string;
    bibtex: string;
    tags: string[];
};