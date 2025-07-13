import { useEffect, useState } from "react";
import Templates from "../controllers/Templates";
import type { Readability } from "@mozilla/readability";
import type { ContentSection } from "@/model/content_section";
import type { UserPreferences } from "@/model/user_preferences";
import { CalmindLayout } from "./CalmindLayout";
import Loader from "../components/Loader";
// import { Spinner } from "../components/Spinner";

const CONTENT_SECTIONS: ContentSection[] = [
  {
    title: "Como Usar Inteligência Artificial no seu TCC de Forma Ética",
    content:
      "A Inteligência Artificial chegou para revolucionar a forma como produzimos conhecimento acadêmico. Mas como usar essas ferramentas de forma ética e produtiva no seu Trabalho de Conclusão de Curso?",
  },
  {
    title: "IA como Ferramenta de Apoio",
    content:
      "Primeiro, é importante entender que a IA deve ser uma ferramenta de apoio, não um substituto para seu pensamento crítico. Ela pode ajudar na organização de ideias, revisão de textos e até mesmo na análise de dados.",
  },
  {
    title: "Transparência e Ética Acadêmica",
    content:
      "Para usar IA de forma ética no seu TCC, sempre declare quando e como utilizou essas ferramentas. A transparência é fundamental para manter a integridade acadêmica do seu trabalho.",
  },
  {
    title: "Principais Aplicações Práticas",
    content:
      "As principais aplicações incluem: revisão gramatical e estilística, organização de referências bibliográficas, análise de dados quantitativos e geração de ideias para desenvolvimento de argumentos.",
  },
  {
    title: "Limitações e Responsabilidades",
    content:
      "Lembre-se de que o conhecimento original, a análise crítica e as conclusões devem sempre partir de você. A IA é uma ferramenta poderosa, mas o pensamento acadêmico genuíno continua sendo insubstituível.",
  },
  {
    title: "Diretrizes Institucionais",
    content:
      "Sempre consulte seu orientador sobre as políticas da sua instituição regarding o uso de IA. Cada universidade pode ter diretrizes específicas que devem ser respeitadas.",
  },
];

function NewLayout({
  showOriginalLayout,
  article,
}: {
  showOriginalLayout: () => void;
  article?: ReturnType<typeof Readability.prototype.parse> | null;
}) {
  const [contentSections, setContentSections] =
    useState<ContentSection[]>(CONTENT_SECTIONS);
  const [loading, setLoading] = useState(true);

  async function getFirstTemplate() {
    console.log("Article:", article);
    chrome.storage.local.get("calmind_profile", (result) => {
      const profile = result.calmind_profile;
      console.log("Perfil carregado:", profile);
    });

    const template = await Templates.getFirstTemplate({
      title: article?.title,
      content: article?.content,
      excerpt: article?.excerpt,
      textContent: article?.textContent,
    });

    setContentSections(template);
    setLoading(false);
  }

  useEffect(() => {
    getFirstTemplate();
  }, []);

  const preferences: UserPreferences = {
    hasReadingDifficulty: true,
    hasFocusDifficulty: false,
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

      <button
        className="fixed z-50 bottom-5
            right-5
          bg-blue-500 
          text-white 
            rounded-md
            border
            px-4 
            py-2 
          hover:bg-blue-600
            transition
          "
        onClick={showOriginalLayout}
      >
        Restaurar página original
      </button>
    </>
  );
}

export default NewLayout;
