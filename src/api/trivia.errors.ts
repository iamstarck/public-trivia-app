export type TriviaError =
  | { type: "TOKEN_INVALID" }
  | { type: "TOKEN_EXHAUSTED" }
  | { type: "NETWORK" }
  | { type: "UKNOWN" };
