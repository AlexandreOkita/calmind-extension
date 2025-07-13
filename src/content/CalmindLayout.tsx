import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { ArrowRight, Brain } from "lucide-react";

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  hasReadingDifficulty: boolean;
  hasFocusDifficulty: boolean;
}

export default function CalmindLayout({ onSubmit }: PreferencesFormProps) {
  const [hasReadingDifficulty, setHasReadingDifficulty] = useState(false);
  const [hasFocusDifficulty, setHasFocusDifficulty] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      hasReadingDifficulty,
      hasFocusDifficulty,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Escolha como você quer ver o mundo online
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Com suas preferências, vamos transformar sites em espaços mais
            tranquilos e amigáveis. Menos confusão, mais clareza. Tudo feito
            para você se sentir bem navegando.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Dificuldade com Leitura */}
          <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="reading-difficulty"
                checked={hasReadingDifficulty}
                onCheckedChange={(checked) =>
                  setHasReadingDifficulty(checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="reading-difficulty"
                  className="text-xl font-semibold text-gray-900 cursor-pointer"
                >
                  Dificuldade com leitura
                </Label>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Dificuldade em entender as palavras. As letras dançam na tela.
                </p>
                {hasReadingDifficulty && (
                  <div className="mt-3 p-3 bg-indigo-50 rounded-md border-l-4 border-indigo-400">
                    <p className="text-sm text-indigo-700">
                      ✓ Ativaremos fontes especiais, espaçamentos otimizados e
                      controles de personalização
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dificuldade em Manter o Foco */}
          <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="focus-difficulty"
                checked={hasFocusDifficulty}
                onCheckedChange={(checked) =>
                  setHasFocusDifficulty(checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="focus-difficulty"
                  className="text-xl font-semibold text-gray-900 cursor-pointer"
                >
                  Dificuldade em manter o foco
                </Label>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Dificuldade em manter o foco durante textos longos
                </p>
                {hasFocusDifficulty && (
                  <div className="mt-3 p-3 bg-green-50 rounded-md border-l-4 border-green-400">
                    <p className="text-sm text-green-700">
                      ✓ Dividiremos o conteúdo em partes menores com navegação
                      passo a passo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botão de Submissão */}
          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              className="w-full h-14 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
              disabled={!hasReadingDifficulty && !hasFocusDifficulty}
            >
              Salvar Minhas Preferências
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {!hasReadingDifficulty && !hasFocusDifficulty && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Selecione pelo menos uma opção para continuar
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
