import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-[9999]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full animate-spin">
            <Loader2 className="text-blue-600 w-6 h-6" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Transformando a página…
        </h2>
        <p className="text-gray-500 mt-1">
          Nossa IA está simplificando o conteúdo para você
        </p>
      </div>
    </div>
  );
}
