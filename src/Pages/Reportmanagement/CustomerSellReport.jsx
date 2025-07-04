import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";


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

// --- NEW: Mock data and a component to display the report ---
const MOCK_REPORT_DATA = {
    totalCustomers: 432,
    totalSell: 78540,
    averageSellPerCustomer: 181.81,
    topSession: "Evening",
};

const ReportDisplay = ({ data, filters }) => (
    <div className="p-6 w-full">
        <h3 className="text-xl font-semibold text-center mb-6">
            Customer Sell Report for {filters.gameName || 'All Games'} on {format(filters.date, "dd-MM-yyyy")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-100 p-4 rounded-lg"><p className="text-sm text-slate-500">Total Customers</p><p className="text-2xl font-bold">{data.totalCustomers.toLocaleString()}</p></div>
            <div className="bg-slate-100 p-4 rounded-lg"><p className="text-sm text-slate-500">Total Sell</p><p className="text-2xl font-bold text-green-600">₹{data.totalSell.toLocaleString()}</p></div>
            <div className="bg-slate-100 p-4 rounded-lg"><p className="text-sm text-slate-500">Avg. Sell / Customer</p><p className="text-2xl font-bold">₹{data.averageSellPerCustomer.toFixed(2)}</p></div>
            <div className="bg-slate-100 p-4 rounded-lg"><p className="text-sm text-slate-500">Busiest Session</p><p className="text-2xl font-bold">{data.topSession}</p></div>
        </div>
    </div>
);

const CustomerSellReport = () => {
  // --- NEW: State for modals and data fetching ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  // 2. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date("2025-06-30T00:00:00"),
      gameName: "",
      gameType: "all",
      session: "",
    },
  });

  // 3. Define a submit handler that manages the modal flow.
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setReportData(null); // Clear previous results

    const formattedData = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
      gameName: values.gameName || 'all',
      session: values.session || 'all',
    };
    console.log("Submitting to dummy API:", formattedData);

    // Simulate API call
    setTimeout(() => {
        // Simulate a successful API response
        console.log("Dummy API response received.");
        setReportData(MOCK_REPORT_DATA);
        setIsLoading(false);
        // Uncomment the line below to test the error modal
        // setError("The server returned an unexpected error. Please try again.");
    }, 2000); // 2-second delay
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <Card className="w-full max-w-7xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Customer Sell Report</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 items-end">
                  {/* Form fields remain the same */}
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "dd-MM-yyyy") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gameName" render={({ field }) => (
                    <FormItem><FormLabel>Game Name</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-Select Game Name-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="game1">Super Loto</SelectItem><SelectItem value="game2">Mega Jackpot</SelectItem><SelectItem value="game3">Lucky 7</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gameType" render={({ field }) => (
                    <FormItem><FormLabel>Game Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a game type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="special">Special Event</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="session" render={({ field }) => (
                    <FormItem><FormLabel>Session</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-Select Session-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="morning">Morning</SelectItem><SelectItem value="afternoon">Afternoon</SelectItem><SelectItem value="evening">Evening</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  
                  <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Generating..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Container with Conditional Rendering */}
        <div className="mt-6 w-full max-w-7xl bg-white rounded-lg min-h-[40vh] shadow-sm flex items-center justify-center">
            {reportData && !isLoading && <ReportDisplay data={reportData} filters={form.getValues()} />}
            {!reportData && !isLoading && <div className="text-center text-gray-400">Report results will be displayed here.</div>}
            {isLoading && <div className="text-center text-gray-500"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />Generating report...</div>}
        </div>
      </div>
      
      {/* --- MODALS SECTION --- */}
      {/* Loading Modal */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" hideCloseButton>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Generating Report</DialogTitle>
            <DialogDescription>Please wait a moment.</DialogDescription>
        </DialogContent>
      </Dialog>
      
      {/* Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Request Failed</DialogTitle>
            <DialogDescription className="pt-2">{error}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button type="button">OK</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerSellReport;