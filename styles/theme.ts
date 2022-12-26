import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    body: `Roboto, sans-serif`,
    heading: `'Roboto Slab', serif`,
  },
  components: {
    Text: {
      variants: {
        sub: (props: any) => ({
          fontSize: "sm",
          color: props.colorMode === "dark" ? "gray.500" : "gray.500",
        }),
      }
    },
    Link: {
      variants: {
        outgoing: (props: any) => ({
          color: props.colorMode === "dark" ? "red.300" : "red.400",
          _hover: {
            color: props.colorMode === "dark" ? "red.50" : "red.700",
            textDecoration: "none",
          },
        }),
      }
    }
  }
}

const theme = extendTheme(config)

export default theme