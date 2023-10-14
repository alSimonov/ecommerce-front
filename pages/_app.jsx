import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
      <GlobalStyles/>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}