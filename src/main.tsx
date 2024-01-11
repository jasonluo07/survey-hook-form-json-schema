import App from '@/App';
import '@/index.css';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  </StrictMode>
);
