import { useEffect, useState } from "react";
import Templates from "../controllers/Templates";
import type { Readability } from "@mozilla/readability";
import type { ContentSection } from "@/model/content_section";
import type { UserPreferences } from "@/model/user_preferences";
import { CalmindLayout } from "./CalmindLayout";
import Loader from "../components/Loader";

function NewLayout({
  showOriginalLayout,
  article,
}: {
  showOriginalLayout: () => void;
  article?: ReturnType<typeof Readability.prototype.parse> | null;
}) {
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  async function getFirstTemplate() {
    console.log("Article:", article);
    chrome.storage.local.get("calmind_profile", async (result) => {
      const profile = result.calmind_profile;
      console.log("Perfil carregado:", profile);

      const template = await Templates.getFirstTemplate({
        title: article?.title,
        content: article?.content,
        excerpt: article?.excerpt,
        textContent: article?.textContent,
        difficulties: profile?.difficulties,
      });

      setDifficulties(profile?.difficulties || []);
      setContentSections(template);
      setLoading(false);
    });
  }

  useEffect(() => {
    getFirstTemplate();
  }, []);

  console.log({ difficulties });
  const preferences: UserPreferences = {
    hasReadingDifficulty: difficulties.includes("reading_challenges"),
    hasRelevanceDifficulty: difficulties.includes("focus_assistance"),
    hasFocusDifficulty: difficulties.includes("long_texts"),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <CalmindLayout
        preferences={preferences}
        contentSections={contentSections}
        onBack={showOriginalLayout}
      />

      <div
        className="fixed z-50 bottom-5
            right-5
            transition
          "
        onClick={showOriginalLayout}
      >
        <button
          className="
        hover:top-[-4px] hover:shadow-[0_4px_0_0_#2563eb,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#2563eb]
        text-white font-bold px-6 py-3 text-base overflow-hidden -top-3 rounded-[18px] border-[3px] border-blue-600 bg-blue-500 shadow-[0_8px_0_0_#2563eb,0_8px_8px_0_rgba(0,0,0,0.4)]"
          onClick={showOriginalLayout}
        >
          Restaurar página original
        </button>
      </div>

      {/* <button
        className="fixed z-50 bottom-5 right-5 transition
        hover:top-[-4px] hover:shadow-[0_4px_0_0_#2563eb,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#2563eb]
        text-white font-bold px-6 py-3 text-base overflow-hidden -top-3 rounded-[18px] border-[3px] border-blue-600 bg-blue-500 shadow-[0_8px_0_0_#2563eb,0_8px_8px_0_rgba(0,0,0,0.4)]"
        onClick={showOriginalLayout}
      >
        Restaurar página original
      </button> */}
    </>
  );
}

export default NewLayout;
