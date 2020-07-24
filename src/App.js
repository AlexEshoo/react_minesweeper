import React from 'react';
import './App.css';
import Game from "./components/Game";
import Container from "@material-ui/core/Container";

function App() {
  return (
      <Container className="App" maxWidth={null}>
        <Game/>
      </Container>

  );
}

export default App;
