import * as z from "zod";
const minLen_name = 3;
const minLen_password = 6;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export const SignupSchema = z.object({
  username: z
    .string()
    .min(minLen_name, {
      message: `Username must be at least ${minLen_name} characters.`,
    })
    .max(20, { message: "Username must be less than 20 characters." }),
  name: z
    .string()
    .min(minLen_name, {
      message: `name must be at least ${minLen_name} characters.`,
    })
    .max(12, { message: "Username must be less than 12 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(minLen_password, {
      message: `password must be at least ${minLen_password} characters.`,
    })
    .regex(
      new RegExp(passwordRegex),
      "Weak password. Please follow the requirements."
    ),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const NewTopicSchema = z.object({
  title: z
    .string()
    .min(minLen_name, {
      message: `Topic title must be at least ${minLen_name} characters.`,
    })
    .max(20, { message: "Topic title must be less than 20 characters." }),

  creator: z.string(),
  description: z
    .string()
    .min(minLen_name, {
      message: `Description must be at least ${minLen_name} characters.`,
    })
    .max(120, { message: "Description must be less than 120 characters." }),
});
