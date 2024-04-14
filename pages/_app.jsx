import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "@/components/Header";



const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    // font-family: 'Istok Web', sans-serif;
  }

`;





export default function App({ Component, pageProps:{ session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>  
    
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&display=swap" /> */}
      <GlobalStyles/>
      <CartContextProvider>
          <Component {...pageProps} />
      </CartContextProvider>
    
    </SessionProvider>
  );
}



