import { useEffect, useRef, useState } from 'react'
import NewLayout from './NewLayout'
import ReactDOM from 'react-dom/client'

function App() {
  const layoutRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const wrapper = document.createElement('div')
    wrapper.id = 'original-content'

    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild)
    }

    document.body.appendChild(wrapper)
  }, [])

  function showOriginalLayout() {
    layoutRootRef.current?.remove()

    const original = document.getElementById('original-content')
    if (original) original.style.display = 'block'
    
  }

  function showNewLayout() {
    const original = document.getElementById('original-content')
    if (original) original.style.display = 'none'

    const rootDiv = document.createElement('div')
    layoutRootRef.current = rootDiv
    document.body.appendChild(rootDiv)

    const root = ReactDOM.createRoot(rootDiv)
    root.render(<NewLayout showOriginalLayout={showOriginalLayout} />)
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
        cursor: 'pointer'
      }}
      onClick={() => {
            showNewLayout()
        }}
    >
      <p>
        Aplicar novo layout
      </p>
    </div>
  )
}

export default App
