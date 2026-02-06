import z from "zod";

export const playerSchema = z.object({
  playerName: z
    .string()
    .min(3, { error: "Min 3" })
    .max(12, { error: "Max 12" }),
});

export type PlayerFormValues = z.infer<typeof playerSchema>;
