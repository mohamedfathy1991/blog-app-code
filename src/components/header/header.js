import { useState } from "react";
import "./header.css";
import HeaderLeft from "./headerleft";
import NavBar from "./navbar";
import HeaderRight from "./headerright";
const Header = () => {


    const [togle,settogle]= useState(false)
  return (
    <header className="header">

        <HeaderLeft togle={togle} settogle={settogle} />
        <NavBar togle={togle} settogle={settogle}/>

        <HeaderRight/>
      
      
     
    </header>
  );
};

export default Header;
