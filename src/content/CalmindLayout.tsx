import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Settings,
  Type,
  Palette,
  Layout,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import type { UserPreferences } from "../model/user_preferences";
import type { ContentSection } from "@/model/content_section";

type AdaptiveContentProps = {
  preferences: UserPreferences;
  contentSections: ContentSection[];
  onBack: () => void;
};

// Dados do conteúdo divididos em seções para modo foco

export default function AdaptiveContent({
  preferences,
  onBack,
  contentSections,
}: AdaptiveContentProps) {
  // Estados para modo dislexia
  const [fontSize, setFontSize] = useState([18]);
  const [letterSpacing, setLetterSpacing] = useState([0.05]);
  const [lineHeight, setLineHeight] = useState([1.8]);
  const [wordSpacing, setWordSpacing] = useState([0.2]);
  const [highContrast, setHighContrast] = useState(false);
  const [fontFamily, setFontFamily] = useState("dyslexic");
  const [showControls, setShowControls] = useState(false);
  const [maxWidth, setMaxWidth] = useState([65]);

  // Estados para modo foco
  const [currentSection, setCurrentSection] = useState(0);

  const getFontFamily = () => {
    switch (fontFamily) {
      case "dyslexic":
        return "font-mono";
      case "arial":
        return "font-sans";
      case "verdana":
        return "font-sans";
      default:
        return "font-mono";
    }
  };

  const getColorScheme = () => {
    if (highContrast) {
      return {
        bg: "bg-black",
        text: "text-yellow-300",
        card: "bg-gray-900 border-yellow-300",
        accent: "text-yellow-400",
      };
    }
    return {
      bg: "bg-amber-50",
      text: "text-gray-800",
      card: "bg-white border-amber-200",
      accent: "text-amber-700",
    };
  };

  const colors = getColorScheme();

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

  const resetToBeginning = () => {
    setCurrentSection(0);
  };

  // Renderização para modo foco (com ou sem dislexia)
  if (preferences.hasFocusDifficulty) {
    const section = contentSections[currentSection];
    const progress = ((currentSection + 1) / contentSections.length) * 100;

    return (
      <div
        className={`min-h-screen ${
          preferences.hasReadingDifficulty
            ? colors.bg
            : "bg-gradient-to-br from-green-50 to-emerald-100"
        }`}
      >
        {/* Header com progresso */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4 text-green-600" />
                {preferences.hasReadingDifficulty
                  ? "Modo Foco + Dislexia Ativo"
                  : "Modo Foco Ativo"}
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>
                Seção {currentSection + 1} de {contentSections.length}
              </span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
          </div>
        </div>

        {/* Barra de Controles de Dislexia - aparece se tem dificuldade de leitura */}
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
                  <Settings className="w-4 h-4" />
                  Personalizar Texto
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Painel de Controles de Dislexia */}
        {preferences.hasReadingDifficulty && showControls && (
          <Card className="mx-4 mt-4 bg-white border-amber-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Personalize sua Experiência de Leitura
              </h3>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-gray-800">
                  <Type className="w-4 h-4" />
                  Tamanho da Fonte: {fontSize[0]}px
                </Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={32}
                  min={14}
                  step={2}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">
                  Espaçamento entre Letras: {letterSpacing[0]}em
                </Label>
                <Slider
                  value={letterSpacing}
                  onValueChange={setLetterSpacing}
                  max={0.3}
                  min={0}
                  step={0.05}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">
                  Espaçamento entre Linhas: {lineHeight[0]}
                </Label>
                <Slider
                  value={lineHeight}
                  onValueChange={setLineHeight}
                  max={3}
                  min={1.2}
                  step={0.2}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">
                  Largura do Texto: {maxWidth[0]}ch
                </Label>
                <Slider
                  value={maxWidth}
                  onValueChange={setMaxWidth}
                  max={80}
                  min={45}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">Tipo de Fonte</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dyslexic">
                      OpenDyslexic (Recomendada)
                    </SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="verdana">Verdana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">
                  Espaçamento entre Palavras: {wordSpacing[0]}em
                </Label>
                <Slider
                  value={wordSpacing}
                  onValueChange={setWordSpacing}
                  max={0.5}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="high-contrast"
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                  <Label
                    htmlFor="high-contrast"
                    className="flex items-center gap-2 text-gray-800"
                  >
                    <Palette className="w-4 h-4" />
                    Alto Contraste
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conteúdo da seção atual */}
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <h1
                className={`text-3xl font-bold mb-4 ${
                  preferences.hasReadingDifficulty
                    ? `${colors.text} ${getFontFamily()}`
                    : "text-gray-900"
                }`}
                style={
                  preferences.hasReadingDifficulty
                    ? {
                        fontSize: `${fontSize[0] * 1.8}px`,
                        letterSpacing: `${letterSpacing[0]}em`,
                        lineHeight: lineHeight[0],
                        wordSpacing: `${wordSpacing[0]}em`,
                      }
                    : {}
                }
              >
                {section.title}
              </h1>
              <h2
                className={`text-xl mb-6 ${
                  preferences.hasReadingDifficulty
                    ? `${colors.accent} ${getFontFamily()}`
                    : "text-green-700"
                }`}
                style={
                  preferences.hasReadingDifficulty
                    ? {
                        fontSize: `${fontSize[0] * 1.2}px`,
                        letterSpacing: `${letterSpacing[0]}em`,
                        lineHeight: lineHeight[0],
                        wordSpacing: `${wordSpacing[0]}em`,
                      }
                    : {}
                }
              ></h2>
              <div
                style={{
                  maxWidth: preferences.hasReadingDifficulty
                    ? `${maxWidth[0]}ch`
                    : "none",
                }}
              >
                <p
                  className={`text-lg leading-relaxed mb-8 ${
                    preferences.hasReadingDifficulty
                      ? `${colors.text} ${getFontFamily()}`
                      : "text-gray-700"
                  }`}
                  style={
                    preferences.hasReadingDifficulty
                      ? {
                          fontSize: `${fontSize[0]}px`,
                          letterSpacing: `${letterSpacing[0]}em`,
                          lineHeight: lineHeight[0],
                          wordSpacing: `${wordSpacing[0]}em`,
                        }
                      : {}
                  }
                >
                  {section.content}
                </p>
              </div>

              {/* Navegação */}
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

              {/* Mensagem de conclusão */}
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
      </div>
    );
  }

  // Renderização para modo dislexia (com ou sem modo foco)
  const fullContent = contentSections
    .map((section) => section.content)
    .join("\n\n");

  return (
    <div className={`min-h-screen transition-all duration-300 ${colors.bg}`}>
      {/* Barra de Controles - só aparece se tem dificuldade de leitura */}
      {preferences.hasReadingDifficulty && (
        <div className="sticky top-0 z-10 border-b backdrop-blur-sm bg-opacity-90">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className={`font-semibold ${colors.text}`}>
                    Modo Dislexia
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowControls(!showControls)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Personalizar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Painel de Controles - só aparece se tem dificuldade de leitura */}
      {preferences.hasReadingDifficulty && showControls && (
        <Card className={`mx-4 mt-4 ${colors.card}`}>
          <CardHeader>
            <h3
              className={`text-lg font-semibold ${colors.text} flex items-center gap-2`}
            >
              <Settings className="w-5 h-5" />
              Personalize sua Experiência
            </h3>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label className={`flex items-center gap-2 ${colors.text}`}>
                <Type className="w-4 h-4" />
                Tamanho da Fonte: {fontSize[0]}px
              </Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={32}
                min={14}
                step={2}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className={`${colors.text}`}>
                Espaçamento entre Letras: {letterSpacing[0]}em
              </Label>
              <Slider
                value={letterSpacing}
                onValueChange={setLetterSpacing}
                max={0.3}
                min={0}
                step={0.05}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className={`${colors.text}`}>
                Espaçamento entre Linhas: {lineHeight[0]}
              </Label>
              <Slider
                value={lineHeight}
                onValueChange={setLineHeight}
                max={3}
                min={1.2}
                step={0.2}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className={`${colors.text}`}>
                Largura do Texto: {maxWidth[0]}ch
              </Label>
              <Slider
                value={maxWidth}
                onValueChange={setMaxWidth}
                max={80}
                min={45}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className={`${colors.text}`}>Tipo de Fonte</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dyslexic">
                    OpenDyslexic (Recomendada)
                  </SelectItem>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="verdana">Verdana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className={`${colors.text}`}>
                Espaçamento entre Palavras: {wordSpacing[0]}em
              </Label>
              <Slider
                value={wordSpacing}
                onValueChange={setWordSpacing}
                max={0.5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
                <Label
                  htmlFor="high-contrast"
                  className={`flex items-center gap-2 ${colors.text}`}
                >
                  <Palette className="w-4 h-4" />
                  Alto Contraste
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {!preferences.hasReadingDifficulty && (
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
        )}

        <div
          className="mx-auto"
          style={{
            maxWidth: preferences.hasReadingDifficulty
              ? `${maxWidth[0]}ch`
              : "65ch",
          }}
        >
          <h1
            className={`font-bold mb-6 ${colors.text} ${
              preferences.hasReadingDifficulty ? getFontFamily() : "font-sans"
            }`}
            style={
              preferences.hasReadingDifficulty
                ? {
                    fontSize: `${fontSize[0] * 1.8}px`,
                    letterSpacing: `${letterSpacing[0]}em`,
                    lineHeight: lineHeight[0],
                    wordSpacing: `${wordSpacing[0]}em`,
                  }
                : {}
            }
          >
            {contentSections[0].title}
          </h1>

          <h2
            className={`mb-8 ${colors.accent} ${
              preferences.hasReadingDifficulty ? getFontFamily() : "font-sans"
            }`}
            style={
              preferences.hasReadingDifficulty
                ? {
                    fontSize: `${fontSize[0] * 1.2}px`,
                    letterSpacing: `${letterSpacing[0]}em`,
                    lineHeight: lineHeight[0],
                    wordSpacing: `${wordSpacing[0]}em`,
                  }
                : {}
            }
          ></h2>

          <div className="space-y-6">
            {fullContent.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className={`${colors.text} ${
                  preferences.hasReadingDifficulty
                    ? getFontFamily()
                    : "font-sans"
                }`}
                style={
                  preferences.hasReadingDifficulty
                    ? {
                        fontSize: `${fontSize[0]}px`,
                        letterSpacing: `${letterSpacing[0]}em`,
                        lineHeight: lineHeight[0],
                        wordSpacing: `${wordSpacing[0]}em`,
                      }
                    : {}
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className={`mt-16 py-8 border-t ${colors.text}`}>
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
