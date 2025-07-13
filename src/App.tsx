import { Brain } from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="p-4 w-56">
      <div className="border border-blue-400 rounded-lg p-4 bg-white">
        <div className="flex items-center mb-5">
          <div className="bg-blue-500 rounded-full p-2">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg ml-2">Calmind</h3>
        </div>
        <button
          className="w-full cursor-pointer
        hover:top-[-4px] hover:shadow-[0_4px_0_0_#2563eb,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#2563eb]
        text-white font-bold px-6 py-3 text-base overflow-hidden relative -top-3 rounded-[18px] border-[3px] border-blue-600 bg-blue-500 shadow-[0_8px_0_0_#2563eb,0_8px_8px_0_rgba(0,0,0,0.4)]"
          onClick={() =>
            window.open(
              "https://3d90d37c-7c71-42b1-81ed-57de8a317863.weweb-preview.io/",
              "_blank"
            )
          }
        >
          Meu Perfil
        </button>
      </div>
    </div>
  );
}

export default App;
