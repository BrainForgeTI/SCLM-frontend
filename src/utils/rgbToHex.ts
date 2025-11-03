export function rgbToHex(rgb: string): string {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) {
        throw new Error("Formato inválido. Use 'rgb(r, g, b)'");
    }

    const [r, g, b] = match.map(Number);

    if ([r, g, b].some((value) => value < 0 || value > 255)) {
        throw new Error("Os valores de RGB devem estar entre 0 e 255.");
    }

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}