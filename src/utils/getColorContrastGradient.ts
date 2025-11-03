function hexToRgb(hex: string): { r: number, g: number, b: number } {
    const match = /^#([a-fA-F0-9]{6})$/.exec(hex);
    if (!match) throw new Error("Formato de cor inválido.");
    const [r, g, b] = [0, 2, 4].map(i => parseInt(match[1].substring(i, i + 2), 16));
    return { r, g, b };
}

function luminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrast(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
    const L1 = luminance(r1, g1, b1);
    const L2 = luminance(r2, g2, b2);
    const bright = Math.max(L1, L2);
    const dark = Math.min(L1, L2);
    return (bright + 0.05) / (dark + 0.05);
}

function getMidColor(color1: string, color2: string): { r: number, g: number, b: number } {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    return {
        r: Math.round((rgb1.r + rgb2.r) / 2),
        g: Math.round((rgb1.g + rgb2.g) / 2),
        b: Math.round((rgb1.b + rgb2.b) / 2)
    };
}

export function getTextConstrastColorGradient(color1: string, color2: string): string {
    const { r, g, b } = getMidColor(color1, color2);

    const contrastWithBlack = getContrast(r, g, b, 0, 0, 0); // Preto
    const contrastWithWhite = getContrast(r, g, b, 255, 255, 255); // Branco

    const minimumContrast = 4.5;

    return contrastWithBlack > contrastWithWhite && contrastWithBlack >= minimumContrast ? "#000000" : "#FFFFFF";
}

export function getInvertedColorConstrast(color1: string, color2: string) {
    return getTextConstrastColorGradient(color1, color2) == "#000000" ? '#FFFFFF' : '#000000';
}

