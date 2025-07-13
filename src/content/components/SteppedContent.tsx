import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Layout } from "lucide-react";
import type { UserPreferences } from "../../model/user_preferences";
import type { ContentSection } from "@/model/content_section";
import { useDyslexiaSettings } from "../contexts/NeuroDiversitySettingsContext"; // Importe o hook
import { ProgressHeader } from "../components/ProgressHeader";
import { InlineDiffViewer } from "./InlineDiffViewer";
import { TextDiffController } from "./TextDiffController";

type SteppedContentProps = {
  preferences: UserPreferences;
  contentSections: ContentSection[];
  onBack: () => void;
};

export function SteppedContent({
  preferences,
  onBack,
  contentSections,
}: SteppedContentProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const {
    // fontSize,
    // letterSpacing,
    // lineHeight,
    // wordSpacing,
    // highContrast,
    // fontFamily,
    textExperience,
    setTextExperience,
    maxWidth,
    getFontFamilyClass,
    getColorScheme,
    dyslexiaStyles,
    dyslexiaStylesTitle,
  } = useDyslexiaSettings(); // Consuma as configurações de dislexia

  const colors = getColorScheme();
  const section = contentSections[currentSection];
  const progress = ((currentSection + 1) / contentSections.length) * 100;

  const nextSection = () => {
    if (currentSection < contentSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSection();
      } else if (e.key === "ArrowLeft") {
        prevSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSection, prevSection]);

  const resetToBeginning = () => {
    setCurrentSection(0);
  };

  const commonTextProps = preferences.hasReadingDifficulty
    ? {
        className: `${colors.text} ${getFontFamilyClass()}`,
        style: dyslexiaStyles,
      }
    : { className: "text-lg leading-relaxed text-gray-700" };

  const titleProps = preferences.hasReadingDifficulty
    ? {
        className: `text-3xl font-bold mb-4 ${
          colors.text
        } ${getFontFamilyClass()}`,
        style: dyslexiaStylesTitle,
      }
    : { className: "text-3xl font-bold mb-4 text-gray-900" };

  const showTextExperience = () => {
    if (textExperience === "original") {
      return <p {...commonTextProps}>{section.originalContent}</p>;
    } else if (textExperience === "replaced") {
      return <p {...commonTextProps}>{section.replacedContent}</p>;
    } else if (textExperience === "diff") {
      return (
        <InlineDiffViewer
          oldText={section.originalContent}
          newText={section.replacedContent}
        />
      );
    }
  };

  return (
    <div
      id="stepped-content"
      className={`min-h-screen ${
        preferences.hasReadingDifficulty
          ? colors.bg
          : "bg-gradient-to-br from-green-50 to-emerald-100"
      }`}
    >
      <ProgressHeader
        onBack={onBack}
        progress={progress}
        currentSection={currentSection}
        totalSections={contentSections.length}
        hasReadingDifficulty={preferences.hasReadingDifficulty}
      />

      {/* {preferences.hasReadingDifficulty && showControls && (
        // DyslexiaControls agora não precisa de props, ele usa o contexto
        <DyslexiaControls />
      )} */}

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-8">
            <h1 {...titleProps}>{section.replacedTitle}</h1>
            <TextDiffController
              viewMode={textExperience}
              setViewMode={setTextExperience}
            />
            <div
              style={{
                maxWidth: preferences.hasReadingDifficulty
                  ? `${maxWidth[0]}ch`
                  : "none",
              }}
            >
              {showTextExperience()}
            </div>
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <Button
                variant="outline"
                onClick={resetToBeginning}
                className="flex items-center gap-2 bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
                Recomeçar
              </Button>

              <Button
                onClick={nextSection}
                disabled={currentSection === contentSections.length - 1}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {currentSection === contentSections.length - 1 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  🎉 Parabéns! Você concluiu a leitura completa do artigo!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Rodapé - pode ser extraído para um componente se for comum */}
      <footer
        className={`mt-16 py-8 border-t ${
          preferences.hasReadingDifficulty ? colors.text : "text-gray-600"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layout className="w-5 h-5" />
            <span className="font-semibold">
              Interface Adaptada{" "}
              {preferences.hasReadingDifficulty &&
              preferences.hasFocusDifficulty
                ? "para Dislexia e Foco"
                : preferences.hasReadingDifficulty
                ? "para Dislexia"
                : "para Foco"}
            </span>
          </div>
          <p className={`text-sm ${colors.text} opacity-75`}>
            Esta interface foi desenvolvida seguindo as melhores práticas de
            acessibilidade
          </p>
        </div>
      </footer>
    </div>
  );
}
