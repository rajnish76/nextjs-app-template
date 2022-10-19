import './globals.css';

function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
