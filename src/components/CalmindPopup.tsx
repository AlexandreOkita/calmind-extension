import { Brain } from "lucide-react";

export default function CalmindPopup({
  showNewLayout,
}: {
  showNewLayout: () => void;
}) {
  return (
    <div
      className="
        z-50
        fixed 
        bottom-5 
        right-5 
        bg-white 
        rounded-2xl
        border 
        border-blue-400 
        p-4 
        w-52
        shadow-lg
        flex 
        flex-col 
        items-center
        space-y-3
        opacity-80
        hover:opacity-100
        "
      style={{ outline: "2px solid #3b82f6" }} // opcional, para aquele contorno azul claro da borda
    >
      <div className="flex items-center space-x-2 justify-between">
        <div className="bg-blue-500 rounded-full p-2">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Calmind</h2>
          <p className="text-gray-600 text-sm">Web no Seu Ritmo</p>
        </div>
      </div>
      <button
        className="
          bg-blue-500 
          text-white 
            rounded-md
            border
            px-4 
            py-2 
            w-full
          hover:bg-blue-600
            transition
          "
        onClick={showNewLayout}
      >
        Ativar Calmind
      </button>
    </div>
  );
}
