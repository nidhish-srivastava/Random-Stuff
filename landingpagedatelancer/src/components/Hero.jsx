
function Hero({darkMode}) {

  return (
    <>
      <section className={`hero_container`}>
        {darkMode ? (
          <h1>
            What do you need <br /> <span className={`heading-highlight`}>help</span>{" "}
            with?
          </h1>
        ) : (
          <h1>
            Tired of <span className={`heading-highlight`}>commission</span>{" "}
            fees <br /> and{" "}
            <span className={`heading-highlight`}>mismatched</span> clients?
          </h1>
        )}
        <p>
          {" "}
          <span style={{ fontWeight: 500 }}>
            We are building a platform
          </span>{" "}
          that uses <strong>AI</strong> to match {" "}
          <>
          {
            darkMode ? <span>
              your projects with the top talent,at no cost.
            </span> : <span>
            you with your perfect freelance gig, and charges you <strong>0%</strong> commission.
            </span>
          }
          </>
        </p>
        <h2>Join Our waitlist</h2>
      </section>
    </>
  );
}

export default Hero;
