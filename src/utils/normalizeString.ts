export const normalizeString = (value: string) => {
    return value
        .normalize("NFD")                      // separa acentos
        .replace(/[\u0300-\u036f]/g, "")      // remove acentos
        .toLowerCase()
        .trim();
}