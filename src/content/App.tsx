import { useRef, useState } from "react";
import NewLayout from "./NewLayout";
import ReactDOM from "react-dom/client";
import { Readability } from "@mozilla/readability";
import CalmindPopup from "../components/CalmindPopup";

function App() {
  const layoutRootRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<ReturnType<
    typeof Readability.prototype.parse
  > | null>(null);

  function showOriginalLayout() {
    layoutRootRef.current?.remove();
    layoutRootRef.current = null;
    document.body.style.display = "block";
  }

  function showNewLayout() {
    if (!articleRef.current) {
      const clonedDoc = document.cloneNode(true) as Document;
      const myArticle = new Readability(clonedDoc).parse();
      console.log("Article:", myArticle);

      document.body.style.display = "none";

      const rootDiv = document.createElement("div");
      rootDiv.id = "new-layout-root";
      rootDiv.style.position = "absolute";
      rootDiv.style.top = "0";
      rootDiv.style.left = "0";
      rootDiv.style.width = "100vw";
      rootDiv.style.height = "100vh";
      rootDiv.style.zIndex = "99998";
      rootDiv.style.backgroundColor = "white";
      rootDiv.style.overflow = "auto";

      layoutRootRef.current = rootDiv;
      document.documentElement.appendChild(rootDiv);

      const root = ReactDOM.createRoot(rootDiv);

      console.log({ myArticle });
      root.render(
        <NewLayout
          showOriginalLayout={showOriginalLayout}
          article={myArticle}
        />
      );
    }
  }

  return <CalmindPopup showNewLayout={showNewLayout} />;
}

export default App;
