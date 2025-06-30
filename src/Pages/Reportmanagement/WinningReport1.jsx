import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


// 1. Define your form schema with Zod
const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  gameName: z.string().optional(),
  marketTime: z.string().optional(),
});

// Dummy data for the table, in a real app this would come from your API
const dummyHistoryData = [
  // The table is initially empty as per the screenshot.
  // You could populate this array with data from an API call.
  // Example entry:
  // {
  //   userName: "Player01", gameName: "Super Loto", gameType: "Daily",
  //   openPana: "123", openDigit: "6", closePana: "456", closeDigit: "5",
  //   points: 10, amount: 100, txId: "TXN12345", txDate: "30-06-2025"
  // }
];

const WinningReport = () => {
  // State to hold the report data
  const [historyData, setHistoryData] = useState(dummyHistoryData);
  
  // 2. Define the form using react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date("2025-06-30T00:00:00"), // Set default date to match the image
      gameName: "",
      marketTime: "",
    },
  });

  // 3. Define the submit handler
  const onSubmit = async (values) => {
    // Format the data for your backend API
    const formattedData = {
      date: format(values.date, "yyyy-MM-dd"), // e.g., "2025-06-30"
      gameName: values.gameName || 'all',     // Send a default value if empty
      marketTime: values.marketTime || 'all', // Send a default value if empty
    };

    console.log("Submitting to dummy API with data:", formattedData);
    alert("Fetching report... Check the console for the submitted data.");

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
        // In a real app, you would fetch the actual report data here
        // and update the state, e.g., setHistoryData(await response.json())
        const result = await response.json();
        console.log("Dummy API response:", result);
        alert("Report request sent successfully! Data would be displayed below.");
        // Since the dummy API doesn't return report data, we'll keep the table empty.
        // setHistoryData(dummyHistoryData); 
      } else {
        console.error("Dummy API call failed:", response.statusText);
        alert("Failed to fetch report.");
      }
    } catch (error) {
      console.error("Error during dummy API call:", error);
      alert("An error occurred while fetching the report.");
    }
  };

  const tableHeaders = [
    "User Name", "Game Name", "Game Type", "Open Pana", "Open digit", 
    "Close Pana", "Close Digit", "Points", "Amount", "Tx Id", "Tx Date"
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center gap-6">
      <Card className="w-full max-w-7xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Winning History Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                              className={cn("w-full justify-between text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "dd-MM-yyyy") : <span>Pick a date</span>}
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Market Time-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open Market</SelectItem>
                          <SelectItem value="close">Close Market</SelectItem>
                        </SelectContent>
                      </Select>
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

      <Card className="w-full max-w-7xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Winning History List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableHead key={header} className="font-semibold text-black">{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.length > 0 ? (
                  historyData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.gameName}</TableCell>
                      <TableCell>{row.gameType}</TableCell>
                      <TableCell>{row.openPana}</TableCell>
                      <TableCell>{row.openDigit}</TableCell>
                      <TableCell>{row.closePana}</TableCell>
                      <TableCell>{row.closeDigit}</TableCell>
                      <TableCell>{row.points}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.txId}</TableCell>
                      <TableCell>{row.txDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={tableHeaders.length} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinningReport;