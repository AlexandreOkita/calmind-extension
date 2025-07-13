import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Settings, Type, Palette } from "lucide-react";
import { useDyslexiaSettings } from "../contexts/NeuroDiversitySettingsContext"; // Importe o hook
import { Button } from "../../components/ui/button";

// DyslexiaControls não precisa mais de props para os estados e setters
export function DyslexiaControls() {
  const {
    fontSize,
    setFontSize,
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight,
    wordSpacing,
    setWordSpacing,
    highContrast,
    setHighContrast,
    fontFamily,
    setFontFamily,
    showControls,
    setShowControls, // Se este botão estiver aqui
    maxWidth,
    setMaxWidth,
    getColorScheme,
  } = useDyslexiaSettings();

  const colors = getColorScheme();

  return (
    <Card className={`mx-4 mt-4 ${colors.card}`}>
      <CardHeader>
        <h3
          className={`text-lg font-semibold ${colors.text} flex items-center gap-2`}
        >
          <Settings className="w-5 h-5" />
          Personalize sua Experiência
        </h3>
        {/* Você pode manter o botão de toggle aqui, se ele controlar a visibilidade dos próprios controles */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2"
        ></Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ... (Seu JSX para os controles aqui, usando as variáveis do useDyslexiaSettings) ... */}
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
  );
}
