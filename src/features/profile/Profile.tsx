/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarIcon } from "@radix-ui/react-icons";

import { format, formatISO } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/configs";
import { useToast } from "@/components/ui/use-toast";
import { ResponseErrorJSON, ResponseSuccessJSON } from "@/types/response";
import { useCallback, useEffect, useState } from "react";
import { Spin } from "@/components/ui/spin";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { IRootState } from "@/store";
import { LoginContext } from "@/types";
import axios from "axios";
import { getAccessToken } from "@/lib/authStorage";
import { UserProfile } from "@/types/user";

const formSchema = z.object({
  user_id: z.number(),
  birth_date: z.date({
    required_error: "A date of birth is required.",
  }),
  whatsapp_number: z.string().min(2, {
    message: "Whatsapp number must be at least 2 characters.",
  }),
  address: z.string().min(4),
  occupation: z.string().min(2),
  photo_profile: z.instanceof(File).optional(),
});

const Profile = () => {
  const { toast } = useToast();
  const loginContext = useSelector<IRootState, LoginContext>((state) => state.auth);

  const { data } = loginContext;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>({
    address: "",
    birth_date: new Date(),
    occupation: "",
    whatsapp_number: "",
    user_id: 0,
    photo_url: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: data?.id,
      whatsapp_number: user.whatsapp_number,
      address: user.address,
      occupation: user.occupation,
      photo_profile: undefined,
    },
  });

  console.log(user);

  const fetchDataUser = useCallback(async () => {
    try {
      const res = await api.get(`/users/${data?.id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [data?.id]);

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const date = formatISO(values.birth_date, { representation: "complete" });
    const formData = new FormData();

    if (data?.id !== undefined) {
      formData.append("user_id", data?.id.toString());
    }

    formData.append("birth_date", date);
    formData.append("whatsapp_number", values.whatsapp_number);
    formData.append("address", values.address);
    formData.append("occupation", values.occupation);

    if (values.photo_profile !== undefined) {
      formData.append("photo_profile", values.photo_profile);
    }

    console.log(values.photo_profile);

    try {
      const res: ResponseSuccessJSON = await axios.put("http://localhost:3000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log(res);
      toast({
        title: "Success!",
        description: res?.data?.message,
        duration: 2500,
      });
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

  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser]);

  useEffect(() => {
    if (user) {
      form.reset({
        user_id: user.user_id,
        birth_date: user.birth_date ? new Date(user.birth_date) : undefined,
        whatsapp_number: user.whatsapp_number,
        address: user.address,
        occupation: user.occupation,
        photo_profile: undefined,
      });
    }
  }, [form, user]);

  return (
    <div className="flex items-center flex-col gap-10">
      <h2 className="font-bold text-3xl">Profile</h2>

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-10 w-full">
                <FormField
                  control={form.control}
                  name="whatsapp_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Whatsapp Number..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Occupation..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Address..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo_profile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                        // onChange={(e) => console.log(e.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">{isLoading ? <Spin /> : "Submit"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
