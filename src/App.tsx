import "./App.css";
import Contact from "./components/Contact";
import Credits from "./components/Credits";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Hud, { Scene } from "./components/Hud";
import Impact from "./components/Impact";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";

const scenes: Scene[] = [
  { id: "title", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "highlights", label: "Highlights" },
  { id: "journey", label: "Journey" },
  { id: "credits", label: "Films" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const App = () => {
  return (
    <div className="App">
      <a className="skip-link" href="#experience">
        Skip to experience
      </a>
      <Hud scenes={scenes} />
      <main>
        <Hero />
        <Experience />
        <Impact />
        <Timeline />
        <Credits />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default App;
