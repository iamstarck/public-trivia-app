import CategorySelectSection from "./trivia/components/CategorySelectSection";
import HomeSection from "./trivia/components/HomeSection";
import useTriviaStore from "./trivia/stores/useTriviaStore";

function App() {
  const screen = useTriviaStore((s) => s.screen);

  return (
    <main>
      {screen === "home" && <HomeSection />}
      {screen === "category" && <CategorySelectSection />}
    </main>
  );
}

export default App;
