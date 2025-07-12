import React from "react";

const App = () => {
  const [counter, setCounter] = React.useState(0);
  return (
    <div
      style={{
        background: "white",
        color: "#333",
        padding: "1rem",
        border: "2px solid black",
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
      }}
    >
      <h2>React na página 🎉</h2>
      <p>Esse conteúdo foi injetado pela extensão.</p>
      <p>Contador: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Contar: {counter}</button>
    </div>
  );
};

export default App;
