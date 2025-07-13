import { Button } from "../../components/ui/button";
import { ChevronLeft, Eye } from "lucide-react";
import { FancyButton } from "./FancyButton";

type ProgressHeaderProps = {
  onBack: () => void;
  progress: number;
  currentSection: number;
  totalSections: number;
  hasReadingDifficulty: boolean;
  colors?: {
    bg: string;
    text: string;
    card: string;
    accent: string;
  };
};

export function ProgressHeader({
  onBack,
  progress,
  currentSection,
  totalSections,
  hasReadingDifficulty,
}: ProgressHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={onBack}
            className="
            hover:bg-blue-500
        hover:top-[-4px] hover:shadow-[0_4px_0_0_#2563eb,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#2563eb]
        text-white font-bold px-6 py-3 text-base overflow-hidden -top-3 rounded-[18px] border-[3px] border-blue-600 bg-blue-500 shadow-[0_8px_0_0_#2563eb,0_8px_8px_0_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </div>
          </Button>
          {/* <FancyButton onClick={onBack}>
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </div>
          </FancyButton> */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="w-4 h-4 text-green-600" />
            {hasReadingDifficulty
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
            Seção {currentSection + 1} de {totalSections}
          </span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
      </div>
    </div>
  );
}
