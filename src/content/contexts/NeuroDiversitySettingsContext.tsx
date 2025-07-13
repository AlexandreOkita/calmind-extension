import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Definindo a interface para o estado e as funções do contexto de dislexia
interface NeuroDiversitySettings {
  textExperience: "original" | "replaced" | "diff";
  setTextExperience: (value: "original" | "replaced" | "diff") => void;
  fontSize: number[];
  setFontSize: (value: number[]) => void;
  letterSpacing: number[];
  setLetterSpacing: (value: number[]) => void;
  lineHeight: number[];
  setLineHeight: (value: number[]) => void;
  wordSpacing: number[];
  setWordSpacing: (value: number[]) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  showControls: boolean;
  setShowControls: (value: boolean) => void;
  maxWidth: number[];
  setMaxWidth: (value: number[]) => void;
  getFontFamilyClass: () => string;
  getColorScheme: () => {
    bg: string;
    text: string;
    card: string;
    accent: string;
  };
  dyslexiaStyles: React.CSSProperties;
  dyslexiaStylesTitle: React.CSSProperties;
  dyslexiaStylesSubtitle: React.CSSProperties;
}

// Criando o Contexto com um valor padrão (pode ser null, mas é bom ter um tipo)
const NeuroDiversitySettingsContext = createContext<
  NeuroDiversitySettings | undefined
>(undefined);

// Criando um hook personalizado para usar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useDyslexiaSettings = () => {
  const context = useContext(NeuroDiversitySettingsContext);
  if (!context) {
    throw new Error(
      "useDyslexiaSettings must be used within a DyslexiaSettingsProvider"
    );
  }
  return context;
};

// Criando o Provider que irá gerenciar o estado e fornecer o contexto
export const DyslexiaSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [textExperience, setTextExperience] = useState<
    "original" | "replaced" | "diff"
  >("replaced");
  const [fontSize, setFontSize] = useState([18]);
  const [letterSpacing, setLetterSpacing] = useState([0.05]);
  const [lineHeight, setLineHeight] = useState([1.8]);
  const [wordSpacing, setWordSpacing] = useState([0.2]);
  const [highContrast, setHighContrast] = useState(false);
  const [fontFamily, setFontFamily] = useState("dyslexic");
  const [showControls, setShowControls] = useState(false);
  const [maxWidth, setMaxWidth] = useState([65]);

  const getFontFamilyClass = () => {
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

  const dyslexiaStyles: React.CSSProperties = {
    fontSize: `${fontSize[0]}px`,
    letterSpacing: `${letterSpacing[0]}em`,
    lineHeight: lineHeight[0],
    wordSpacing: `${wordSpacing[0]}em`,
  };

  const dyslexiaStylesTitle: React.CSSProperties = {
    fontSize: `${fontSize[0] * 1.8}px`,
    letterSpacing: `${letterSpacing[0]}em`,
    lineHeight: lineHeight[0],
    wordSpacing: `${wordSpacing[0]}em`,
  };

  const dyslexiaStylesSubtitle: React.CSSProperties = {
    fontSize: `${fontSize[0] * 1.2}px`,
    letterSpacing: `${letterSpacing[0]}em`,
    lineHeight: lineHeight[0],
    wordSpacing: `${wordSpacing[0]}em`,
  };

  const value = {
    textExperience,
    setTextExperience,
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
    setShowControls,
    maxWidth,
    setMaxWidth,
    getFontFamilyClass,
    getColorScheme,
    dyslexiaStyles,
    dyslexiaStylesTitle,
    dyslexiaStylesSubtitle,
  };

  return (
    <NeuroDiversitySettingsContext.Provider value={value}>
      {children}
    </NeuroDiversitySettingsContext.Provider>
  );
};
