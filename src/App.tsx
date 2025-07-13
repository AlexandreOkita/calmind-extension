import { Brain } from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <div className="p-4">
        <div className="border border-blue-400 rounded-lg p-4 bg-white">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg ml-2">Calmind</h3>
          </div>
          <button
            className="w-full mt-3
          bg-blue-500 
          text-white 
            rounded-md
            border
            px-4 
            py-2 
          hover:bg-blue-600
            transition
          "
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
    </>
  );
}

export default App;
