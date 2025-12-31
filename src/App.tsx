import CategorySelectSection from "./trivia/components/CategorySelectSection";
import HomeSection from "./trivia/components/HomeSection";
import QuizScreenSection from "./trivia/components/QuizScreenSection";
import useTriviaStore from "./trivia/stores/useTriviaStore";

function App() {
  const screen = useTriviaStore((s) => s.screen);

  return (
    <main>
      {screen === "home" && <HomeSection />}
      {screen === "category" && <CategorySelectSection />}
      {screen === "trivia" && <QuizScreenSection />}
    </main>
  );
}

export default App;
