import axios from "axios";
import MetaTags from "@/lib/metaTags";
import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineGoogle } from "react-icons/ai";
import { googleAuth } from "./firebaseAuth";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formFields = [
    { fieldName: "name", placeholder: "Jon Doe" },
    { fieldName: "username", placeholder: "@user_name" },
    { fieldName: "email", placeholder: "myemail@gmail.com" },
    { fieldName: "password", placeholder: "*****" },
  ];

  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useUserContext();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(values) {
    try {
      axios
        .post(`${import.meta.env.VITE_SERVER_AUTH_PORT}register`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          sessionStorage.setItem("userSession", JSON.stringify(data));
          setUserAuth(data);
        })
        .catch(
          ({
            response: {
              data: { errorMsg },
            },
          }) => {
            toast({
              title: errorMsg,
              variant: "destructive",
            });
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  const googleAuthHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await googleAuth();

      axios
        .post(import.meta.env.VITE_SERVER_AUTH_PORT + "google-auth", userData)
        .then(({ data }) => {
          sessionStorage.setItem("userSession", JSON.stringify(data));
          setUserAuth(data);
        })
        .catch(
          ({
            response: {
              data: { error },
            },
          }) => {
            toast({
              title: error,
              variant: "destructive",
            });
          }
        );
    } catch (error) {
      toast({
        title: "error happend, please try again",
        variant: "destructive",
      });
      return console.log(error);
    }
  };

  return (
    <>
      <MetaTags title="Sign-up" />
      <h2 className="pt-5 text-xl font-bold leading-[140%] tracking-wide md:text-2xl sm:pt-8">
        create new acount
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 min-w-[280px] max-w-[320px] animate-[slideDown_ease-in-out_0.7s_forwards]"
        >
          {formFields.map((fieldItem, index) => {
            const { fieldName, placeholder } = fieldItem;
            return (
              <FormField
                key={index}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>{fieldName}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={placeholder}
                        type={fieldName}
                        className="h-12 bg-[#031e3c] border-none placeholder:text-slate-500/50 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#4180a1] m-0 "
                        aria-invalid={
                          form.formState.errors.name ? "true" : "false"
                        }
                      />
                    </FormControl>
                    {fieldName === "username" && (
                      <FormDescription>
                        This is your public display username.
                      </FormDescription>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Toaster />
          <Button
            // variant="authCta"
            type="submit"
            className="flex w-full gap-2 my-4 capitalize"
            size="lg"
          >
            sign up
          </Button>

          <div className="flex items-center gap-1 my-3">
            <hr className="w-1/2 border-slate-300" />
            <span className="text-slate-600">OR</span>
            <hr className="w-1/2 border-slate-300" />
          </div>

          <Button
            variant="default"
            className="w-full"
            onClick={googleAuthHandler}
          >
            <AiOutlineGoogle size={25} />
            continue with google
          </Button>

          <p className="text-center text-[#FFF7D6]/60">
            Already have acount?
            <Link to={`/sign-in`} className="">
              <Button variant="link" className="text-[#FFF7D6]" size="sm">
                Sign In
              </Button>
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
