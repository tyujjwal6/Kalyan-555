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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";


// --- Define the form schema with Zod ---
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

// --- Mock Data for the table ---
const MOCK_WITHDRAWAL_DATA = [
    { id: 1, userName: 'Player01', mobile: '9876543210', amount: 5000, paymentMethod: 'UPI', requestNo: 'REQ-001', date: '30-06-2025', status: 'Pending' },
    { id: 2, userName: 'UserX', mobile: '8765432109', amount: 2500, paymentMethod: 'Bank Transfer', requestNo: 'REQ-002', date: '30-06-2025', status: 'Pending' },
    { id: 3, userName: 'ProGamer', mobile: '7654321098', amount: 10000, paymentMethod: 'UPI', requestNo: 'REQ-003', date: '30-06-2025', status: 'Pending' },
];

const WithdrawReport = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: new Date("2025-06-30") },
  });

  // --- NEW: State for modals, data, and loading status ---
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // --- Updated submit handler with modal logic ---
  const onSubmit = (data) => {
    const formattedData = { date: format(data.date, "yyyy-MM-dd") };
    console.log("Form Submitted. Data ready for API call:", formattedData);

    setIsLoading(true);
    setWithdrawalData([]); // Clear previous results

    // Simulate API call
    setTimeout(() => {
      setWithdrawalData(MOCK_WITHDRAWAL_DATA);
      setIsLoading(false);
    }, 1500); // 1.5-second delay
  };

  // --- NEW: Handlers for View and Action modals ---
  const handleViewClick = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsViewModalOpen(true);
  };

  const handleActionClick = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsActionModalOpen(true);
  };
  
  const handleUpdateRequest = (status) => {
    if (!selectedWithdrawal) return;
    console.log(`Updating request ${selectedWithdrawal.requestNo} to ${status}`);
    setWithdrawalData(prevData =>
      prevData.map(item =>
        item.id === selectedWithdrawal.id ? { ...item, status } : item
      )
    );
    setIsActionModalOpen(false);
  };


  return (
    <>
      <div className="bg-slate-50 min-h-screen w-full p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Form Card */}
          <Card className="mb-8">
            <CardHeader><CardTitle className="text-xl font-semibold">Withdraw History Report</CardTitle></CardHeader>
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
            <CardHeader><CardTitle className="text-xl font-semibold">Withdraw List</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead><TableHead>Mobile</TableHead><TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead><TableHead>Request No.</TableHead><TableHead>Date</TableHead>
                      <TableHead>Status</TableHead><TableHead>View</TableHead><TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={9} className="text-center h-24"><Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                    ) : withdrawalData.length > 0 ? (
                      withdrawalData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.userName}</TableCell><TableCell>{item.mobile}</TableCell>
                          <TableCell>₹{item.amount.toLocaleString()}</TableCell><TableCell>{item.paymentMethod}</TableCell>
                          <TableCell>{item.requestNo}</TableCell><TableCell>{item.date}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === 'Approved' ? 'success' : item.status === 'Rejected' ? 'destructive' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell><Button variant="outline" size="sm" onClick={() => handleViewClick(item)}>View</Button></TableCell>
                          <TableCell><Button variant="default" size="sm" onClick={() => handleActionClick(item)} disabled={item.status !== 'Pending'}>Action</Button></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={9} className="text-center h-24 text-muted-foreground">No withdraw history found.</TableCell></TableRow>
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
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Fetching Report</DialogTitle></DialogContent></Dialog>
      
      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Withdrawal Details</DialogTitle><DialogDescription>Request No: {selectedWithdrawal?.requestNo}</DialogDescription></DialogHeader>
          <div className="grid gap-2 py-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">User Name:</span><span>{selectedWithdrawal?.userName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Mobile:</span><span>{selectedWithdrawal?.mobile}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Amount:</span><span className="font-semibold">₹{selectedWithdrawal?.amount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment Method:</span><span>{selectedWithdrawal?.paymentMethod}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span>{selectedWithdrawal?.date}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status:</span><Badge variant={selectedWithdrawal?.status === 'Approved' ? 'success' : selectedWithdrawal?.status === 'Rejected' ? 'destructive' : 'secondary'}>{selectedWithdrawal?.status}</Badge></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Action Modal */}
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Take Action on Request</DialogTitle><DialogDescription>Approve or reject the withdrawal request for <span className="font-semibold">{selectedWithdrawal?.userName}</span>.</DialogDescription></DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <Button variant="destructive" onClick={() => handleUpdateRequest('Rejected')}>Reject</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleUpdateRequest('Approved')}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawReport;