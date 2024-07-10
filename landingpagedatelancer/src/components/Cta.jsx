import { EmailIcon } from "./EmailIcon"

function Cta({darkMode}) {
  return (
    <div className={`input-bar-container ${darkMode && "waitlist-container"}`}>
    <span>
      <EmailIcon />
    </span>
    <input type="text" placeholder="Enter your email" style={{backgroundColor : "transparent"}} />
    <button>Join waitlist</button>
  </div>
  )
}

export default Cta