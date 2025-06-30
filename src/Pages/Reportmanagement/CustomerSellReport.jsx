import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Make sure you have this utility file from shadcn/ui
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// 1. Define your form schema using Zod.
const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  gameName: z.string().optional(),
  gameType: z.string({
    required_error: "Please select a game type.",
  }),
  session: z.string().optional(),
});

const CustomerSellReport = () => {
  // 2. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date("2025-06-30T00:00:00"), // Set default date to match the image
      gameName: "",
      gameType: "all",
      session: "",
    },
  });

  // 3. Define a submit handler.
  const onSubmit = async (values) => {
    // Format data for the backend API
    const formattedData = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"), // A common format for APIs
      gameName: values.gameName || 'all', // Send 'all' if empty
      session: values.session || 'all', // Send 'all' if empty
    };

    console.log("Submitting to dummy API:", formattedData);

    // Simulate hitting a dummy API endpoint
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Dummy API response:", result);
        alert("Report submitted successfully! Check console for details.");
      } else {
        console.error("Dummy API call failed:", response.statusText);
        alert("Failed to submit report.");
      }
    } catch (error) {
      console.error("Error during dummy API call:", error);
      alert("An error occurred while submitting the report.");
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <Card className="w-full max-w-7xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Customer Sell Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 items-end">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gameName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Game Name-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="game1">Super Loto</SelectItem>
                          <SelectItem value="game2">Mega Jackpot</SelectItem>
                          <SelectItem value="game3">Lucky 7</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gameType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a game type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="special">Special Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="session"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Session-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* This empty container mimics the layout from the image where results would be displayed. */}
      <div className="mt-6 w-full max-w-7xl bg-white rounded-lg min-h-[40vh]"></div>
    </div>
  );
};

export default CustomerSellReport;