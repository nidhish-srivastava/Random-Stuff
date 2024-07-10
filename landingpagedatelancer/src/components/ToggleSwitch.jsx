
function ToggleSwitch({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`toggle-container`}>
      <span style={{opacity : darkMode ? "1" : ".7"}}>For Hiring</span>
      <label className="switch">
        <input type="checkbox" checked={!darkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
      <span style={{opacity : darkMode ? ".7" : "1"}}>For Freelancers</span>
    </div>
  );
}

export default ToggleSwitch;
