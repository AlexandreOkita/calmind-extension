import { Button } from "../../components/ui/button";
import { ChevronLeft, Layout } from "lucide-react";
import type { UserPreferences } from "../../model/user_preferences";
import type { ContentSection } from "@/model/content_section";
import { useDyslexiaSettings } from "../contexts/NeuroDiversitySettingsContext"; // Importe o hook
import { TextDiffController } from "./TextDiffController";
import { InlineDiffViewer } from "./InlineDiffViewer";

type DefaultContentProps = {
  preferences: UserPreferences; // Mantenha as preferências para outras lógicas
  contentSections: ContentSection[];
  onBack: () => void;
};

export function DefaultContent({
  preferences, // Continue usando se necessário para outras lógicas
  onBack,
  contentSections,
}: DefaultContentProps) {
  const {
    // fontSize,
    // letterSpacing,
    // lineHeight,
    // wordSpacing,
    textExperience,
    setTextExperience,
    getFontFamilyClass,
    getColorScheme,
    dyslexiaStyles,
    dyslexiaStylesTitle,
    maxWidth,
  } = useDyslexiaSettings(); // Consuma as configurações de dislexia

  const colors = getColorScheme();

  const getTextExperience = (contentSection: ContentSection) => {
    switch (textExperience) {
      case "replaced":
        return contentSection.replacedContent;
      case "diff":
        return (
          <InlineDiffViewer
            oldText={contentSection.originalContent}
            newText={contentSection.replacedContent}
          />
        );
      case "original":
      default:
        return contentSection.originalContent;
    }
  };

  // As props dinâmicas baseadas nas configurações de dislexia
  const commonTextProps = preferences.hasReadingDifficulty
    ? {
        className: `${colors.text} ${getFontFamilyClass()} `,
        style: dyslexiaStyles,
      }
    : { className: "text-lg leading-relaxed text-gray-700 mb-8" };

  const titleProps = preferences.hasReadingDifficulty
    ? {
        className: `font-bold mb-6 ${colors.text} ${getFontFamilyClass()}`,
        style: dyslexiaStylesTitle,
      }
    : { className: "text-3xl font-bold mb-6 text-gray-900" };

  return (
    <div
      id="default-content"
      className={`min-h-screen ${
        preferences.hasReadingDifficulty ? colors.bg : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar às Preferências
          </Button>
        </div>

        <div
          className={`max-w-4xl mx-auto p-8 shadow-lg rounded-lg ${
            preferences.hasReadingDifficulty ? colors.card : "bg-white"
          }`}
          style={
            preferences.hasReadingDifficulty
              ? { maxWidth: `${maxWidth[0]}ch` }
              : { maxWidth: "65ch" }
          }
        >
          <h1 {...titleProps}>{contentSections[0].replacedTitle}</h1>
          <TextDiffController
            viewMode={textExperience}
            setViewMode={setTextExperience}
          />

          <div className="space-y-6">
            {contentSections.map((section, index) => (
              <p key={index} {...commonTextProps}>
                {getTextExperience(section)}
              </p>
            ))}
          </div>
        </div>
      </div>

      <footer
        className={`mt-16 py-8 border-t ${
          preferences.hasReadingDifficulty ? colors.text : "text-gray-600"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layout className="w-5 h-5" />
            <span className="font-semibold">
              Interface{" "}
              {preferences.hasReadingDifficulty
                ? "Adaptada para Dislexia"
                : "Padrão"}
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
