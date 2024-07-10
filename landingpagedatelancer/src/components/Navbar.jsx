function Navbar({darkMode}) {
  return (
    <main className="navbar">
      <span className="logo">
        <span className="f">Date</span>
        <span className={darkMode ? "r white" : "r"}>Lancer</span>
      </span>
      <div className="nav-links">
        <a
        href="#home"
        >
          Home
        </a>

        <a
          href="#about"
        >
          About Us
        </a>
        <a
          href="#contact"
        >
          Contact Us
        </a>
        <a
          href="#faqs"
        >
          FAQs
        </a>
      </div>
      <button className={`waitlist-btn`}>Join Waitlist</button>
    </main>
  );
}

export default Navbar;
