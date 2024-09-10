import { extendTheme } from "@chakra-ui/react";


// Or export `extendBaseTheme` if you only want the default Chakra theme tokens to extend (no default component themes)
export const customTheme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: true,
    },
    styles: {
        global: (props: any) => ({
            body: {
                bg: props.colorMode === "light" ? "white" : "gray.800",
            },
        }),
    },
});
