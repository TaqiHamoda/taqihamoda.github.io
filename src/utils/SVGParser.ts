interface SvgObject {
    viewBox: string;
    path: string | string[];
}

function parseElement(element: Element, paths: string[]) {
    switch (element.tagName) {
        case "path":
            const d = element.getAttribute("d") ?? "";
            paths.push(d);
            break;
        case "circle":
            const cx = parseFloat(element.getAttribute("cx") ?? "0");
            const cy = parseFloat(element.getAttribute("cy") ?? "0");
            const r = parseFloat(element.getAttribute("r") ?? "0");
            const circleD = `M${cx} ${cy}m${-r},0a${r},${r} 0 1,0 ${
                2 * r
            },0a${r},${r} 0 1,0 ${-2 * r},0`;
            paths.push(circleD);
            break;
        case "rect":
            const x = parseFloat(element.getAttribute("x") ?? "0");
            const y = parseFloat(element.getAttribute("y") ?? "0");
            const width = parseFloat(element.getAttribute("width") ?? "0");
            const height = parseFloat(element.getAttribute("height") ?? "0");
            const rectD = `M${x} ${y}h${width}v${height}h${-width}v${-height}`;
            paths.push(rectD);
            break;
        case "line":
            const x1 = parseFloat(element.getAttribute("x1") ?? "0");
            const y1 = parseFloat(element.getAttribute("y1") ?? "0");
            const x2 = parseFloat(element.getAttribute("x2") ?? "0");
            const y2 = parseFloat(element.getAttribute("y2") ?? "0");
            const lineD = `M${x1} ${y1}L${x2} ${y2}`;
            paths.push(lineD);
            break;
        case "polyline":
        case "polygon":
            const points = element.getAttribute("points") ?? "";
            const polyD = `M${points}z`;
            paths.push(polyD);
            break;
        case "ellipse":
            const ellipseCx = parseFloat(element.getAttribute("cx") ?? "0");
            const ellipseCy = parseFloat(element.getAttribute("cy") ?? "0");
            const rx = parseFloat(element.getAttribute("rx") ?? "0");
            const ry = parseFloat(element.getAttribute("ry") ?? "0");
            const ellipseD = `M${ellipseCx} ${
                ellipseCy - ry
            }a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
            paths.push(ellipseD);
            break;
        case "g":
            for (const child of element.children as any) {
                parseElement(child, paths);
            }
            break;
    }
}

export default function parseSvg(svgString: string): SvgObject {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.documentElement;

    const viewBox = svgElement.getAttribute("viewBox") ?? "";

    const paths: string[] = [];
    for (const child of svgElement.children as any) {
        parseElement(child, paths);
    }

    return {
        viewBox,
        path: paths.length === 1 ? paths[0] : paths,
    };
}
