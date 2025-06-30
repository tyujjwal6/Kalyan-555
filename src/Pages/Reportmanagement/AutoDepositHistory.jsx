// src/components/AutoDepositHistory.jsx

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Assuming you have a `lib/utils.js` file for the cn function from shadcn/ui setup
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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the Zod schema for form validation
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

const AutoDepositHistory = () => {
  // 1. Initialize the form using react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Set the default date to match the screenshot: 30-06-2025
      date: new Date("2025-06-30"),
    },
  });

  // 2. Define the submit handler function
  const onSubmit = (data) => {
    // Format the date into a standard format for your API
    const formattedData = {
      date: format(data.date, "yyyy-MM-dd"),
    };

    console.log("Form Submitted. Data ready for API call:", formattedData);

    // --- DUMMY API CALL SIMULATION ---
    // In a real application, you would make your API call here.
    // For now, we'll use an alert to show the captured data.
    alert(`Simulating API call to fetch deposit history for date: ${formattedData.date}`);
    
    /*
    // Example of how you might integrate a real API call:
    fetch('/api/auto-deposit-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
    .then(response => response.json())
    .then(result => {
      console.log('API Response:', result);
      // Update state with the fetched history data to populate the table
      // e.g., setDepositHistory(result.data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });
    */
  };
  
  // The screenshot shows an empty table. We'll use an empty array for the initial state.
  // This would typically be managed by a state hook (e.g., useState, useQuery).
  const depositHistory = [];

  return (
    <div className="bg-slate-50 min-h-screen w-full p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Auto Deposit Form Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Auto Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-4 sm:space-y-0">
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
                                "w-[240px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* UPDATED: Added Tailwind CSS classes to make the button blue */}
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Auto Deposit History Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Auto Deposit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">#</TableHead>
                    <TableHead className="font-semibold">User Name</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Method</TableHead>
                    <TableHead className="font-semibold">UPI</TableHead>
                    <TableHead className="font-semibold">Txn Request No.</TableHead>
                    <TableHead className="font-semibold">Txn ID</TableHead>
                    <TableHead className="font-semibold">Txn Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {depositHistory.length > 0 ? (
                    depositHistory.map((item, index) => (
                      <TableRow key={item.txnId}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>{item.upi}</TableCell>
                        <TableCell>{item.txnRequestNo}</TableCell>
                        <TableCell>{item.txnId}</TableCell>
                        <TableCell>{item.txnDate}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                        No deposit history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoDepositHistory;