import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { api } from "@/configs";
import { useToast } from "@/components/ui/use-toast";
import { ResponseErrorJSON, ResponseSuccessJSON } from "@/types/response";
import { useState } from "react";
import { Spin } from "@/components/ui/spin";

const formSchema = z.object({
  email_token: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_token: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const res: ResponseSuccessJSON = await api.post("/auth/verify-email", values);

      toast({
        title: "Success!",
        description: res?.message,
        duration: 2500,
      });
      navigate("/");
    } catch (error) {
      const err = error as ResponseErrorJSON;

      toast({
        title: "Error!",
        description: err?.response?.data?.message,
        duration: 2500,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl m-auto p-5 flex justify-center items-center h-screen">
      <div className="bg-white p-20 w-full rounded-md shadow">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-semibold">Verify your account</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email_token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify</FormLabel>
                    <FormControl>
                      <Input type="type" placeholder="Token..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">{isLoading ? <Spin /> : "Submit"}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
