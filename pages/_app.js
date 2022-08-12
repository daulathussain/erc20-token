import React, { StrictMode } from "react";
import "../styles/globals.css";
//INTERNAL IMPORT
import { ERC20ICONProvider } from "../context/ERC20ICO";
import NavBar from "../components/User/User/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => (
  <StrictMode>
    <ERC20ICONProvider>
      <NavBar />
      <Component {...pageProps} />
    </ERC20ICONProvider>
  </StrictMode>
);

export default MyApp;
