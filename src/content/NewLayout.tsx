import { useEffect } from "react";
import Templates from "../controllers/Templates";
import type { Readability } from "@mozilla/readability";
import CalmindLayout from "./CalmindLayout";

function NewLayout({
  showOriginalLayout,
  article,
}: {
  showOriginalLayout: () => void;
  article?: ReturnType<typeof Readability.prototype.parse> | null;
}) {
  async function getFirstTemplate() {
    // console.log("Article:", article);
    chrome.storage.local.get("calmind_profile", (result) => {
      const profile = result.calmind_profile;
      console.log("Perfil carregado:", profile);
    });
    await Templates.getFirstTemplate({
      title: article?.title,
      content: article?.content,
      excerpt: article?.excerpt,
      textContent: article?.textContent,
    });
  }

  useEffect(() => {
    getFirstTemplate();
  }, []);

  return (
    <>
      <CalmindLayout
        onSubmit={(preferences) => {
          console.log(preferences);
        }}
      ></CalmindLayout>
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          bottom: 20,
          right: 20,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
        onClick={() => showOriginalLayout()}
      >
        <p>Restaurar página original</p>
      </div>
    </>
  );
}

export default NewLayout;
