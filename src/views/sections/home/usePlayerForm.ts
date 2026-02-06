import { useForm } from "react-hook-form";
import useTriviaStore from "@/stores/useTriviaStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerSchema, type PlayerFormValues } from "./player.schema";

export const usePlayerForm = () => {
  const setUserName = useTriviaStore((s) => s.setUserName);

  const defaultValues: PlayerFormValues = {
    playerName: "",
  };

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues,
  });

  const onSubmit = (data: PlayerFormValues) => {
    setUserName(data);
    form.reset(defaultValues);
  };

  return {
    ...form,
    onSubmit,
  };
};
