# Calmind

## 🧠 O que é o Calmind?

O **Calmind** é uma extensão para o Google Chrome que usa **inteligência artificial** para tornar conteúdos da internet mais acessíveis a **pessoas neurodivergentes**.  
Nosso objetivo é transformar páginas com blocos extensos de texto em informações mais claras, organizadas e fáceis de ler.

Este repositório contém o backend responsável por **orquestrar as chamadas ao modelo Gemini**, que adapta o conteúdo original para um formato mais acessível.

---

## 💡 Por que criamos isso?

Muito se fala sobre **diversidade e inclusão** no mercado de trabalho, mas pouco se discute sobre **acessibilidade no aprendizado**.  
Como uma pessoa neurodivergente pode se capacitar se a maioria dos conteúdos online são difíceis de consumir?  
E quando ingressam em uma empresa, conseguem realmente entender os materiais de onboarding?
E essa extensão é expansível para *qualquer* tipo de conteúdo de texto.

O Calmind nasceu para **reduzir essas barreiras** e promover uma internet mais inclusiva.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Chrome Extension APIs

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) instalado (v20 ou superior)

---

## 📦 Instalação e Execução

1. **Clone o repositório**
2. Instale as dependências
```js
npm run install
```
3. Build do projeto
   
Para gerar os arquivos da extensão, execute:
```js
npm run build:all
```
4. Instale a extensão no Google Chrome:

- Acesse chrome://extensions/
- Ative o Modo do desenvolvedor (canto superior direito)
- Clique em "Carregar sem compactação"
- Selecione a pasta dist/ gerada

## 🧪 Como Usar
1. Após a instalação, um formulário será aberto automaticamente  
2. Marque suas dificuldades, como:

   ✅ "Ler é um desafio para mim"  
   ✅ "Palavras difíceis me atrapalham"  
   ✅ entre outras

3. Acesse qualquer site que deseja consumir de forma mais acessível  
4. Clique em **"Ativar Calmind"** no canto inferior direito da tela  

✨ **Pronto! Agora é só aproveitar e navegar pela internet de forma mais leve, clara e acessível.**


## 🔗 Integração com o Backend

Este frontend se comunica com o [calmind-ai-processor](https://github.com/mariabsouza/calmind-ai-processor) (backend), responsável por processar e simplificar os textos com base nas preferências do usuário.

