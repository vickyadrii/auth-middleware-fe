/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth";
import { api } from "@/configs";
import { useToast } from "@/components/ui/use-toast";
import { ResponseErrorJSON, ResponseSuccessJSON } from "@/types/response";
import { useState } from "react";
import { Spin } from "@/components/ui/spin";
import { setAccessToken } from "@/lib/authStorage";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(4),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const res: ResponseSuccessJSON = await api.post("/auth/login", values);
      const { token, ...dataWithoutToken } = res.data;

      dispatch(authActions.login(dataWithoutToken));
      setAccessToken(res.data?.token);
      toast({
        title: "Success!",
        description: res?.message,
        duration: 2500,
      });
      navigate("/profile", { replace: true });
    } catch (error) {
      const err = error as ResponseErrorJSON;

      toast({
        title: "Error!",
        description: err?.response?.data?.message,
        duration: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl m-auto p-5 flex justify-center items-center h-screen">
      <div className="bg-white p-20 w-full rounded-md shadow">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-semibold">Hello, Welcome back!</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <Button type="submit">{isLoading ? <Spin /> : "Submit"}</Button>
                <Link to="/register" className="text-sm font-semibold text-blue-600 underline">
                  Create an account
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
