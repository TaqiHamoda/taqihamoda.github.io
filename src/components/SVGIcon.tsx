import React, { useState, useEffect } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { createIcon } from '@chakra-ui/icons';
import { parse } from 'svg-parser';

interface SVGIconProps extends IconProps {
  src: string;
  displayName: string;
}

const SVGIcon = ({ src, displayName, ...props }: SVGIconProps) => {
    const [icon, setIcon]: [any, any] = useState(null);

    useEffect(() => {
        if (src) {
            const fetchSvg = async () => {
                try {
                    const response = await fetch(src);
                    const svgText = await response.text();
                    const parsedSvg = parse(svgText);
                    const paths = parsedSvg.children[0].children.filter((child: any) => child.tagName === 'path');
                    const iconComponent = createIcon({
                        displayName: displayName,
                        viewBox: parsedSvg.children[0].properties.viewBox,
                        d: paths.map((path: any) => path.properties.d).join(' '),
                    });
                    setIcon(iconComponent);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchSvg();
        }
    }, [src]);

    if (!icon) return null;

    return <Icon as={icon} {...props} />;
};

export default SVGIcon;
