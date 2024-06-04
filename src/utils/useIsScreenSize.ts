import { useState, useEffect } from 'react';


/**
 * A React hook that detects whether the screen size is smaller than a given maximum width.
 *
 * @param maxWidth The maximum width in pixels.
 * @returns A boolean indicating whether the screen size is smaller than the given maximum width.
 */
export default function useIsScreenSize(maxWidth: number): boolean {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
        setIsSmallScreen(mediaQuery.matches);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsSmallScreen(event.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, [maxWidth]);


    return isSmallScreen;
};
