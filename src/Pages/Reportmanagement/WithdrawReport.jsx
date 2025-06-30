// src/components/WithdrawReport.jsx

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

// Define the form schema using Zod for validation
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

const WithdrawReport = () => {
  // 1. Initialize the form with react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Set the default date as seen in the image: 30-06-2025
      date: new Date("2025-06-30"),
    },
  });

  // 2. Define the submit handler
  const onSubmit = (data) => {
    // Format the date to a more readable string or the format your API expects
    const formattedData = {
      date: format(data.date, "yyyy-MM-dd"),
    };
    
    console.log("Form Submitted. Data ready for API call:", formattedData);

    // --- DUMMY API CALL SIMULATION ---
    // This is where you would integrate your backend API call.
    // We'll use an alert to demonstrate that the data is captured.
    alert(`Simulating API call to fetch records for date: ${formattedData.date}`);
    
    /*
    // Example of a real fetch call:
    fetch('/api/withdraw-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
    .then(response => response.json())
    .then(result => {
      console.log('API Response:', result);
      // You would then update state with the fetched data to populate the table
      // e.g., setWithdrawalData(result.data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });
    */
  };
  
  // The list is empty in the screenshot. We'll use an empty array for the initial state.
  // In a real application, this would be managed by a state management library (e.g., useState, React Query).
  const withdrawalData = [];

  return (
    <div className="bg-slate-50 min-h-screen w-full p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Withdraw History Report Form Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Withdraw History Report</CardTitle>
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

        {/* Withdraw List Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Withdraw List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">User Name</TableHead>
                    <TableHead className="font-semibold">Mobile</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Payment Method</TableHead>
                    <TableHead className="font-semibold">Request No.</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">View</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawalData.length > 0 ? (
                    withdrawalData.map((item) => (
                      <TableRow key={item.requestNo}>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.paymentMethod}</TableCell>
                        <TableCell>{item.requestNo}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                         <TableCell>
                          <Button variant="ghost" size="sm">Action</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                        No withdraw history found.
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

export default WithdrawReport;