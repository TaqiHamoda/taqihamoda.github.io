import fs from "fs";
import path from "path";
import process from "process";

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

interface Translation {
    ns: string;
    filePath: string;
    language: string;
    data: any;
};

export function getTranslations() {
    const translations: Translation[] = [];
    const translationDir = `${process.cwd()}/locales/translations`;

    for (const lang in locales) {
        fs.readdirSync(`${translationDir}/${lang}`).forEach((file) => {
            const filePath = path.join(translationDir, lang, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile() && path.extname(file) === ".json") {
                const fileContents = fs.readFileSync(filePath, "utf8");
                const data = JSON.parse(fileContents);

                translations.push({
                    language: lang,
                    ns: path.basename(filePath, ".json"),
                    data,
                    filePath,
                });
            }
        });
    }

    return translations;
}
