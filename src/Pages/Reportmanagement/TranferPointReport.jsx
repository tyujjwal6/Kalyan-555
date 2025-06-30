import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // This utility is part of the default shadcn/ui setup

const TransferPointReport = () => {
  // State to hold the selected date. Initialized to match the screenshot.
  // Note: JavaScript months are 0-indexed, so 5 represents June.
  const [date, setDate] = useState(new Date(2025, 5, 30));

  // State for the transfer data and total amount. Initially empty as per the UI.
  const [transfers, setTransfers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Prepare form data for the backend API
    const formData = {
      // Format the date to a standard format like YYYY-MM-DD
      reportDate: date ? format(date, "yyyy-MM-dd") : null,
    };

    console.log("Submitting form with data:", formData);
    alert(`A dummy API would be called with this data: ${JSON.stringify(formData)}`);

    // --- DUMMY API CALL ---
    // In a real application, you would make an API call here.
    // For now, we'll simulate it and keep the table empty as per the screenshot.
    try {
      // Example of what an API call might look like:
      // const response = await fetch('/api/transfer-report', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();
      
      // if (response.ok) {
      //   setTransfers(result.transfers);
      //   setTotalAmount(result.totalAmount);
      // } else {
      //   // Handle API errors (e.g., show a toast notification)
      //   console.error("API Error:", result.message);
      // }
    } catch (error) {
      console.error("Failed to fetch transfer report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Filter Section Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Transfer Point Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* UPDATED: Added Tailwind CSS classes to make the button blue */}
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transfer List Section Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Transfer List</CardTitle>
            {/* UPDATED: Added Tailwind CSS classes to make the button blue */}
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Total Transfer Amount: ₹ {totalAmount.toLocaleString('en-IN')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">#</TableHead>
                    <TableHead>Sender Name</TableHead>
                    <TableHead>Receiver Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers.length > 0 ? (
                    transfers.map((transfer, index) => (
                      <TableRow key={transfer.id}>
                         <TableCell className="font-medium">{index + 1}</TableCell>
                         <TableCell>{transfer.senderName}</TableCell>
                         <TableCell>{transfer.receiverName}</TableCell>
                         <TableCell>₹ {transfer.amount.toLocaleString('en-IN')}</TableCell>
                         <TableCell>{transfer.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results.
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

export default TransferPointReport;