import { useState } from "react";
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Cta from "./components/Cta";
import BackGroundGrid from "./components/BackgroundGrid"
import ToggleSwitch from "./components/ToggleSwitch";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <main className={`main-container ${darkMode ? "dark-mode" :""}`}>
    <Navbar darkMode={darkMode}/>
    <BackGroundGrid darkMode={darkMode}/>
    <ToggleSwitch  darkMode={darkMode} setDarkMode={setDarkMode}/>
    <Hero darkMode={darkMode}/>
    <Cta darkMode={darkMode}/>
    </main>
  )
}

export default App