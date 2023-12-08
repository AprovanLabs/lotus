import { AppProps } from 'next/app';
import '../styles/globals.css';

/**
 * Set defaults for all pages
 * We can use this to make sure each page gets the same styling, for example (see import '../styles/globals.css'; above)
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
