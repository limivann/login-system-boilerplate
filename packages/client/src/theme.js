import { extendTheme } from '@chakra-ui/react';

const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fontWeights: {
    medium: 500,
    bold: 700,
  },
};

export default extendTheme(theme);
