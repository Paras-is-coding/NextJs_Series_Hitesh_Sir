import { z } from "zod";

export const messageSchema = z.object({
  content: z
  .string()
  .min(10, { message: "Enter at  least 10 char message!" })
  .max(300,{message:"Max 300 char message!"})
});
 