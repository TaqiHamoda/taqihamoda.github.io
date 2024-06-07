interface locale {
    default: boolean;
};

export const locales: { [key: string]: locale } = {
    ar: {
        default: false,
    },
    en: {
        default: true,
    },
    es: {
        default: false,
    },
};
