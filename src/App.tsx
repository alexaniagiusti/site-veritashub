import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { AboutTeam } from "./sections/AboutTeam";
import { ExpandingHeadline } from "./sections/ExpandingHeadline";
import { Hero } from "./sections/Hero";
import { StorySwitcher } from "./sections/StorySwitcher";
import "./styles/variables.css";
import { Sandbox } from "./sections/Sandbox";

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/sandbox") {
    return <Sandbox />;
  }

  return (
    <div>
      <Header variant="dark" />
      <main>
        <Hero />
        <ExpandingHeadline />
        <StorySwitcher />
        <AboutTeam />
      </main>
      <Footer />
    </div>
  );
}

export default App;
