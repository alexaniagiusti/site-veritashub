import { useEffect, useState } from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { AboutTeam } from "./sections/AboutTeam";
import { Blog } from "./sections/Blog";
import { ExpandingHeadline } from "./sections/ExpandingHeadline";
import { Hero } from "./sections/Hero";
import { Login } from "./sections/Login";
import { StorySwitcher } from "./sections/StorySwitcher";
import "./styles/variables.css";

const getCurrentHash = () => window.location.hash || "#home";

function App() {
  const [activeHash, setActiveHash] = useState(getCurrentHash);
  const isBlogPage = activeHash === "#blog";
  const isLoginPage = activeHash === "#login";

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(getCurrentHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div>
      {!isLoginPage ? (
        <Header activeHref={isBlogPage ? "#blog" : activeHash} variant={isBlogPage ? "light" : "dark"} />
      ) : null}
      <main>
        {isLoginPage ? (
          <Login />
        ) : isBlogPage ? (
          <Blog />
        ) : (
          <>
            <Hero />
            <ExpandingHeadline />
            <StorySwitcher />
            <AboutTeam />
          </>
        )}
      </main>
      {!isLoginPage ? <Footer /> : null}
    </div>
  );
}

export default App;
