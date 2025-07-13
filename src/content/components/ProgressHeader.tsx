import { Button } from "../../components/ui/button";
import { ChevronLeft, Eye } from "lucide-react";

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
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
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
