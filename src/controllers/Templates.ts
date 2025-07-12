// src/controllers/Templates.ts

export default class Templates {
  static async getFirstTemplate({ title, content, excerpt, textContent }: { title?: string | null; content?: string | null; excerpt?: string | null; textContent?: string | null }) {

    console.log("Fetching first template with data:", { title, content, excerpt, textContent });
    
    try {
    //   const response = await fetch('https://seu-backend.com/api/templates/first', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Authorization': `Bearer ${token}`, // se precisar de autenticação
    //     },
    //   })
    

    const data = {
        title: "Título",
        subTitle: "Subtítulo",
        content: ["Conteúdo do template 1", "Conteúdo do template 2"],
    }

    //   if (!response.ok) {
    //     throw new Error(`Erro ao buscar template: ${response.statusText}`)
    //   }

    //   const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro em getFirstTemplate:', error)
      throw error
    }
  }
}
