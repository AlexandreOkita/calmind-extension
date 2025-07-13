import { Eye } from "lucide-react";
import { Button } from "../../components/ui/button";

export function TextDiffController({
  viewMode,
  setViewMode,
}: {
  viewMode: "replaced" | "diff" | "original";
  setViewMode: (mode: "replaced" | "diff" | "original") => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-8 mt-8">
      <Button
        variant={viewMode === "replaced" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("replaced")}
        className="flex items-center gap-2"
      >
        Ver Texto Aprimorado
      </Button>
      <Button
        variant={viewMode === "diff" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("diff")}
        className="flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Mostrar Comparação
      </Button>
      <Button
        variant={viewMode === "original" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("original")}
        className="flex items-center gap-2"
      >
        Ver Original
      </Button>
    </div>
  );
}
