import { useRef, useState } from 'react'
import NewLayout from './NewLayout'
import ReactDOM from 'react-dom/client'
import { Readability } from '@mozilla/readability'

function App() {
  const layoutRootRef = useRef<HTMLDivElement | null>(null)
  const articleRef = useRef<ReturnType<typeof Readability.prototype.parse> | null>(null)
  const [article, setArticle] = useState<ReturnType<typeof Readability.prototype.parse> | null>(null)

  function showOriginalLayout() {
    layoutRootRef.current?.remove()
    layoutRootRef.current = null
    document.body.style.display = 'block'
  }

  function showNewLayout() {
    if (!articleRef.current) {
      const clonedDoc = document.cloneNode(true) as Document;
      const article = new Readability(clonedDoc).parse();
      setArticle(article)
      console.log('Article:', article)
    }

    document.body.style.display = 'none'

    const rootDiv = document.createElement('div')
    rootDiv.id = 'new-layout-root'
    rootDiv.style.position = 'absolute'
    rootDiv.style.top = '0'
    rootDiv.style.left = '0'
    rootDiv.style.width = '100vw'
    rootDiv.style.height = '100vh'
    rootDiv.style.zIndex = '99998'
    rootDiv.style.backgroundColor = 'white'
    rootDiv.style.overflow = 'auto'

    layoutRootRef.current = rootDiv
    document.documentElement.appendChild(rootDiv)

    const root = ReactDOM.createRoot(rootDiv)
    root.render(
      <NewLayout
        showOriginalLayout={showOriginalLayout}
        article={article}
      />
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 99999,
        bottom: 20,
        right: 20,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        cursor: 'pointer',
      }}
      onClick={showNewLayout}
    >
      <p className="bg-red-500 text-white p-2 rounded">Aplicar novo layout</p>
    </div>
  )
}

export default App
