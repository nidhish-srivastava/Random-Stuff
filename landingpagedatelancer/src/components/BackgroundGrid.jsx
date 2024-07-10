function BackgroundGrid({darkMode}) {
  return (
    <div className={`grid-container ${darkMode ? "dark-mode-grid" : ""}`}>
    {[...Array(128)].map((_, index) => (
      <div key={index} className="grid-cell"></div>
    ))}
  </div>
  )
}

export default BackgroundGrid