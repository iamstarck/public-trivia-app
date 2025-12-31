import { Button } from "@/components/ui/button";

interface TriviaQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

interface AnswersButtonProps {
  questions: TriviaQuestion[];
  currentIndex: number;
  onHandleAnswer: (answerIndex: number) => void;
}

const AnswersButton: React.FC<AnswersButtonProps> = ({
  questions,
  currentIndex,
  onHandleAnswer,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 w-full">
      {questions[currentIndex].answers.map((answer, index) => (
        <Button
          key={index}
          onClick={() => onHandleAnswer(index)}
          variant="brutal-normal"
          className="w-full max-w-sm min-h-20 h-auto mx-auto flex items-center hover:bg-secondary"
        >
          <p className="text-left font-bold text-wrap text-lg leading-snug">
            {answer}
          </p>
        </Button>
      ))}
    </div>
  );
};

export default AnswersButton;
