function NewLayout({showOriginalLayout}: {showOriginalLayout: () => void}) {
  return (
    <>
    <div style={{ backgroundColor: "white", height: "100vh" }}>
        <h1>Novo título</h1>
        <h3>Sub título</h3>
        <span>Conteúdo do novo layout</span>
      </div>
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        bottom: 20,
        right: 20,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}
      onClick={() => showOriginalLayout()}
    >
      <p>
        Restaurar página original
      </p>
    </div>
    </>
  )
}

export default NewLayout
