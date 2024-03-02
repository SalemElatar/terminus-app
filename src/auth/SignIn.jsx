import axios from "axios";
import { useEffect, useState } from "react";
import MetaTags from "@/lib/metaTags";
import { useUserContext } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/lib/validation";
import { googleAuth } from "./firebaseAuth";
import { useToast } from "@ui/use-toast";
import { Toaster } from "@ui/toaster";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { AiOutlineGoogle } from "react-icons/ai";
import { RxEyeOpen } from "react-icons/rx";

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formFields = [
    { fieldName: "email", placeholder: "myemail@gmail.com" },
    { fieldName: "password", placeholder: "*****" },
  ];

  const [passwordVisible, setPasswordVisible] = useState(false);

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
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    try {
      axios
        .post(import.meta.env.VITE_SERVER_AUTH_PORT + "signin", values)
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
      <MetaTags title="Terminus - Sign-in" />

      <h2 className="pt-5 text-xl font-bold leading-[140%] tracking-wide md:text-2xl sm:pt-8">
        welcome back
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
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={placeholder}
                          type={fieldName}
                          className="h-12 pr-12 m-0"
                          passwordVisible={passwordVisible}
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
                      {fieldName == "password" && (
                        <RxEyeOpen
                          size={23}
                          className={
                            "absolute -translate-y-1/2 cursor-pointer right-4 top-1/2 rounded-md p-1 " +
                            (passwordVisible && "bg-slate-700/80")
                          }
                          onClick={() =>
                            setPasswordVisible((prevState) => !prevState)
                          }
                        />
                      )}
                    </div>

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
            sign in
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
            {/* Already have acount? */}
            don't have acount
            <Link to={`/sign-up`} className="">
              <Button variant="link" className="text-[#FFF7D6]" size="sm">
                Sign Up
              </Button>
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SigninForm;
