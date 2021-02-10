import React from "react";
import './App.css';
import Footer from "./components/Footer";

// Components
import InputMeme from "./components/InputMeme";
import ListMeme from "./components/ListMeme";

function App() {
  return (
    <div className = "bg">
      <div className = "container">
        <h1 className = "heading pt-5">Meme Stream</h1>
        <InputMeme/>
        <ListMeme/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
