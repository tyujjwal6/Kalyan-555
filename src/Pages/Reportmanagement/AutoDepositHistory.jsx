// src/components/AutoDepositHistory.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Define the Zod schema for form validation
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

// --- Mock Data for the table ---
const MOCK_DEPOSIT_DATA = [
    { id: 1, userName: 'Player01', amount: 2000, method: 'UPI', upi: 'player01@upi', txnRequestNo: 'DEPREQ-001', txnId: 'TXN54321', txnDate: '30-06-2025 10:30 AM' },
    { id: 2, userName: 'UserX', amount: 500, method: 'UPI', upi: 'userx@upi', txnRequestNo: 'DEPREQ-002', txnId: 'TXN54322', txnDate: '30-06-2025 11:45 AM' },
    { id: 3, userName: 'ProGamer', amount: 10000, method: 'Gateway', upi: 'N/A', txnRequestNo: 'DEPREQ-003', txnId: 'TXN54323', txnDate: '30-06-2025 01:15 PM' },
];

const AutoDepositHistory = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: new Date("2025-06-30") },
  });

  // --- NEW: State for modals, data, and loading status ---
  const [depositHistory, setDepositHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // --- Updated submit handler with modal logic ---
  const onSubmit = (data) => {
    const formattedData = { date: format(data.date, "yyyy-MM-dd") };
    console.log("Form Submitted. Data ready for API call:", formattedData);
    
    setIsLoading(true);
    setDepositHistory([]); // Clear previous results

    // Simulate API call
    setTimeout(() => {
        setDepositHistory(MOCK_DEPOSIT_DATA);
        setIsLoading(false);
    }, 1500); // 1.5-second delay
  };

  // --- NEW: Handler for the View modal ---
  const handleViewClick = (deposit) => {
    setSelectedDeposit(deposit);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="bg-slate-50 min-h-screen w-full p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Form Card */}
          <Card className="mb-8">
            <CardHeader><CardTitle className="text-xl font-semibold">Auto Deposit</CardTitle></CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-4 sm:space-y-0">
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal",!field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Fetching..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Table Card */}
          <Card>
            <CardHeader><CardTitle className="text-xl font-semibold">Auto Deposit History</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead><TableHead>User Name</TableHead><TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead><TableHead>UPI</TableHead><TableHead>Txn Request No.</TableHead>
                      <TableHead>Txn ID</TableHead><TableHead>Txn Date</TableHead><TableHead>View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                       <TableRow><TableCell colSpan={9} className="text-center h-24"><Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                    ) : depositHistory.length > 0 ? (
                      depositHistory.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell><TableCell>{item.userName}</TableCell>
                          <TableCell>₹{item.amount.toLocaleString()}</TableCell><TableCell>{item.method}</TableCell>
                          <TableCell>{item.upi}</TableCell><TableCell>{item.txnRequestNo}</TableCell>
                          <TableCell>{item.txnId}</TableCell><TableCell>{item.txnDate}</TableCell>
                          <TableCell><Button variant="outline" size="sm" onClick={() => handleViewClick(item)}>View</Button></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={9} className="text-center h-24 text-muted-foreground">No deposit history found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* Loading Modal */}
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Fetching History</DialogTitle></DialogContent></Dialog>
      
      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Deposit Details</DialogTitle><DialogDescription>Transaction ID: {selectedDeposit?.txnId}</DialogDescription></DialogHeader>
          <div className="grid gap-2 py-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">User Name:</span><span className="font-medium">{selectedDeposit?.userName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Amount:</span><span className="font-semibold text-green-600">₹{selectedDeposit?.amount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Method:</span><span className="font-medium">{selectedDeposit?.method}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">UPI:</span><span className="font-medium">{selectedDeposit?.upi}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Request No:</span><span className="font-medium">{selectedDeposit?.txnRequestNo}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{selectedDeposit?.txnDate}</span></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoDepositHistory;