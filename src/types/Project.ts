import ImgType from "./ImgType";

export default interface Project {
    link: string;
    name: string;
    image: ImgType;
    year: number;
    description: string;
}
