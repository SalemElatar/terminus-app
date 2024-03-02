import topicsApi from "@/api/topics";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTopicSchema } from "@/lib/validation";
import { Input } from "@ui/input";
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
import { useToast } from "@ui/use-toast";
import { Toaster } from "@ui/toaster";
import { LuListEnd } from "react-icons/lu";

const NewTopicPage = () => {
  const {
    userAuth: { user: { personal_data: { name } = {} } = {}, accessToken },
  } = useUserContext();

  const { toast } = useToast();
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(NewTopicSchema),
    defaultValues: {
      title: "",
      creator: `@ ${name && name}`,
      description: "",
    },
  });

  function onSubmit(values) {
    setLoadingButton(true);
    try {
      accessToken &&
        topicsApi
          .post(`create-topic`, values, {
            headers: {
              Authorization: `Bearer ${accessToken} `,
            },
          })
          .then(({ data }) => {
            setTimeout(() => {
              navigate(`/topics/${data._id}`);
            }, 5000);
          })
          .catch(
            ({
              response: {
                data: { message },
              },
            }) => {
              toast({
                title: message,
                variant: "destructive",
              });
            }
          );
    } catch (error) {
      console.log(error);
    }
    setLoadingButton(false);
  }

  return (
    <div className="p-6 rounded-md bg-primary-foreground/50 animate-[slideDown_ease-in-out_0.7s_forwards]">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
        <LuListEnd />
        create new topic
      </h2>

      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 min-w-[280px] max-w-[320px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Topic Title</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      placeholder="e.g., travel advices, web dev, book recommendations...  "
                      className="h-12 pr-6 m-0 bg-transparent border border-solid border-input"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>topic creator</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="h-12 pr-6 m-0 font-bold border-solid border-input text-cyan-600 "
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>description</FormLabel>
                <div className="relative">
                  <FormDescription>
                    Who would like to follow this topic?
                  </FormDescription>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="e.g., a space to discuses the works of jon doe"
                      className="flex w-full px-3 py-2 text-sm bg-transparent border rounded-md shadow-sm resize-none border-input placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      rows="3"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={loadingButton ? "loading" : "default"}
            type="submit"
            className="flex w-full gap-2 my-4 capitalize"
            size="lg"
          >
            create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTopicPage;
