export function getDominantColorFromImage(image: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context?.drawImage(image, 0, 0);

    const pixelsImage = context?.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0;
    let g = 0;
    let b = 0;
    let cont = 0;

    if (pixelsImage) {
        for (let i = 0; i < pixelsImage.length; i += 4) {
            r += pixelsImage[i];
            g += pixelsImage[i + 1];
            b += pixelsImage[i + 2];

            cont++;
        }

        r = Math.floor(r / cont);
        g = Math.floor(g / cont);
        b = Math.floor(b / cont);

        const color = `rgb(${r}, ${g}, ${b})`;

        return color;
    }

    return null;
}