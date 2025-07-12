import ReactDOM from "react-dom/client";
import App from "./App";

// Cria um container dentro da página
const rootEl = document.createElement("div");
rootEl.id = "my-react-extension-root";
document.body.appendChild(rootEl);

// Usa React 18
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
