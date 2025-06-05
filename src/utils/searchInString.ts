import { normalizeString } from "./normalizeString";

export const searchInString = (text: string, search: string): boolean => {
    let textNormalized = normalizeString(text);
    const searchWords = normalizeString(search).split(/\s+/);

    return searchWords.every((word: string) => textNormalized.includes(word));
}