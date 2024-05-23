import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "@/components/Header";
import { AccountContextProvider } from "@/components/AccountContext";

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

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

  useEffect(() => {
    // OneSignal.init({ appId: 'fcea5578-439a-462e-ad71-d09dc1ab8a11' });

   
    
    OneSignal.init({
      appId: 'fcea5578-439a-462e-ad71-d09dc1ab8a11',
      notifyButton: { enable: true },
      allowLocalhostAsSecureOrigin: true,
    });
  

  });


  return (
    <SessionProvider session={session}>  
    
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&display=swap" /> */}
      <GlobalStyles/>
      <AccountContextProvider>
        <CartContextProvider>
            <Component {...pageProps} />
        </CartContextProvider>
      </AccountContextProvider>
    
    </SessionProvider>
  );
}



