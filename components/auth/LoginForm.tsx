"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import AuthCard from "./AuthCard";
import * as z from "zod";
import LoginSchema from "@/types/login-schema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = (value: z.infer<typeof LoginSchema>) => {
    console.log(value);
    // execute(value);
  };
  return (
    <AuthCard
      cardTitle={"Welcome Back!"}
      backButtonhref={"/auth/register"}
      backButtonLabel={"Create a New Account"}
      showSocial
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="abc@email.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
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
                      <Input {...field} placeholder="*****" type="password" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            <Button asChild variant={"link"} size={"sm"}>
              <Link href={"/auth/reset"}>Forget Password?</Link>
            </Button>
            <Button
              className={cn(
                "w-full my-2",
                status === "executing" ? "animate-pulse" : ""
              )}
              type="submit"
            >
              {/* {showTwoFactor ? "Verify" : "Sign In"} */}
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
