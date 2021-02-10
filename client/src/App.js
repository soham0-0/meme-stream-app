import React from "react";
import logo from "./assets/logo.png"
import './App.css';

// Components
import InputMeme from "./components/InputMeme";
import ListMeme from "./components/ListMeme";
import Footer from "./components/Footer";

function App() {
  return (
    <div className = "bg">
      <div className = "navbar justify-content-center">
        <img className = "navbar-brand" style = {{height: "100px", verticalAlign: "middle"}} src = {logo} alt = "Meme Stream Logo"/>
        <h1>Meme Stream</h1>
      </div>
      <div className = "container">
        <InputMeme/>
        <ListMeme/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
