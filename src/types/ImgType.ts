export default interface ImgType {
    publicURL: string,
    childImageSharp: null | {
        gatsbyImageData: {
            placeholder: {
                fallback: string
            },
            images: {
                fallback: {
                    src: string,
                    srcSet: string
                },
            }
        }
    }
};