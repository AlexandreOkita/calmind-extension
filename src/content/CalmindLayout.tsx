// src/components/CalmindLayout.tsx

import {
  DyslexiaSettingsProvider,
  useDyslexiaSettings,
} from "./contexts/DyslexiaSettingsContext";
import { DyslexiaControls } from "./components/DyslexiaControls";
import { SteppedContent } from "./components/SteppedContent"; // Importe SteppedContent
import { DefaultContent } from "./components/DefaultContent"; // Importe DefaultContent
import type { UserPreferences } from "../model/user_preferences"; // Importe UserPreferences
import type { ContentSection } from "@/model/content_section"; // Importe ContentSection
import { Button } from "../components/ui/button";
import { Eye, Settings } from "lucide-react";

interface CalmindLayoutProps {
  preferences: UserPreferences; // Agora o layout precisa das preferências
  contentSections: ContentSection[]; // E das seções de conteúdo
  onBack: () => void; // E da função de voltar
}

export function CalmindLayoutContent({
  preferences,
  contentSections,
  onBack,
}: CalmindLayoutProps) {
  const { showControls, setShowControls } = useDyslexiaSettings();
  const isFocusMode = preferences.hasFocusDifficulty;

  return (
    <div className="calmind-layout-container">
      {preferences.hasReadingDifficulty && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">
                  Controles de Dislexia
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowControls(!showControls)}
                className="flex items-center gap-2"
              >
                <Settings
                  className={`w-4 h-4 ${
                    showControls ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                Personalizar Texto
              </Button>
            </div>
          </div>
        </div>
      )}

      {showControls && <DyslexiaControls />}

      {isFocusMode ? (
        <SteppedContent
          preferences={preferences}
          contentSections={contentSections}
          onBack={onBack}
        />
      ) : (
        <DefaultContent
          preferences={preferences}
          contentSections={contentSections}
          onBack={onBack}
        />
      )}
    </div>
  );
}

export function CalmindLayout({
  preferences,
  contentSections,
  onBack,
}: CalmindLayoutProps) {
  return (
    <DyslexiaSettingsProvider>
      <CalmindLayoutContent
        preferences={preferences}
        contentSections={contentSections}
        onBack={onBack}
      />
    </DyslexiaSettingsProvider>
  );
}
