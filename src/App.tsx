import HomeSection from "./views/sections/home/HomeSection";
import ResultSection from "./views/sections/ResultSection";
import TriviaConfigurationSection from "./views/sections/configuration/TriviaConfigurationSection";
import useTriviaStore from "./stores/useTriviaStore";
import TriviaScreenSection from "./views/sections/trivia/TriviaScreenSection";

function App() {
  const screen = useTriviaStore((s) => s.screen);

  return (
    <main>
      {screen === "home" && <HomeSection />}
      {screen === "configuration" && <TriviaConfigurationSection />}
      {screen === "trivia" && <TriviaScreenSection />}
      {screen === "result" && <ResultSection />}
    </main>
  );
}

export default App;
