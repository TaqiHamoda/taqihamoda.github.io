import React, { useState, useEffect } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { createIcon } from '@chakra-ui/icons';

import parseSVG from '../utils/SVGParser';

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
                    const parsedSvg = parseSVG(svgText);

                    const iconComponent = createIcon({
                        displayName: displayName,
                        viewBox: parsedSvg.viewBox,
                        d: parsedSvg.path as any,
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
