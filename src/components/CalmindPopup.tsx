import { FancyButton } from "../content/components/FancyButton";
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
      <div className="flex items-center space-x-2 justify-between mb-5">
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
        hover:top-[-4px] hover:shadow-[0_4px_0_0_#2563eb,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#2563eb]
        text-white font-bold px-6 py-3 text-base overflow-hidden relative -top-3 rounded-[18px] border-[3px] border-blue-600 bg-blue-500 shadow-[0_8px_0_0_#2563eb,0_8px_8px_0_rgba(0,0,0,0.4)]"
        onClick={showNewLayout}
      >
        Ativar Calmind
      </button>
      {/* <FancyButton type="blue" onClick={showNewLayout}>
        Ativar Calmind
      </FancyButton> */}
    </div>
  );
}
