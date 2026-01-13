import HomeSection from "./trivia/components/HomeSection";
import ResultSection from "./trivia/components/ResultSection";
import TriviaConfigurationSection from "./trivia/components/TriviaConfigurationSection";
import useTriviaStore from "./trivia/stores/useTriviaStore";
import TriviaScreenSection from "./trivia/components/TriviaScreenSection";

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
