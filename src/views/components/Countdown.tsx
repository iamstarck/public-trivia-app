import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface CountdownProps {
  timeLeft: number;
}

const Countdown = ({ timeLeft }: CountdownProps) => {
  const formattedTime = dayjs.duration(timeLeft, "seconds").format("mm:ss");

  return <h2 className="text-3xl text-accent">{formattedTime}</h2>;
};

export default Countdown;
