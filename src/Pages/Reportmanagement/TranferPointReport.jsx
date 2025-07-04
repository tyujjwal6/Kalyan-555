import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"; // Import loader icon
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- Mock Data for Demonstration ---
const MOCK_TRANSFERS = [
  { id: 1, senderName: 'user_101', receiverName: 'player_A', amount: 5000, date: '30 Jun 2025 10:15 AM' },
  { id: 2, senderName: 'user_102', receiverName: 'player_B', amount: 2500, date: '30 Jun 2025 11:30 AM' },
  { id: 3, senderName: 'user_103', receiverName: 'player_C', amount: 10000, date: '30 Jun 2025 01:45 PM' },
];
const MOCK_TOTAL_AMOUNT = 17500;


const TransferPointReport = () => {
  const [date, setDate] = useState(new Date(2025, 5, 30));
  
  // --- NEW: State for modals and data fetching ---
  const [transfers, setTransfers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);


  // Updated form submission handler with modal logic
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { reportDate: date ? format(date, "yyyy-MM-dd") : null };
    console.log("Submitting form with data:", formData);
    
    // 1. Start Loading
    setIsLoading(true);
    setTransfers([]);
    setTotalAmount(0);

    // 2. Simulate API Call
    setTimeout(() => {
      // On success, set data and stop loading
      setTransfers(MOCK_TRANSFERS);
      setTotalAmount(MOCK_TOTAL_AMOUNT);
      setIsLoading(false);
    }, 2000); // 2-second delay
  };

  // --- NEW: Handler for the summary modal ---
  const handleSummaryClick = () => {
    if (transfers.length > 0) {
      setIsSummaryModalOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Filter Section Card */}
          <Card className="w-full">
            <CardHeader><CardTitle>Transfer Point Report</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                  <Popover>
                    <PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Generating...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Transfer List Section Card */}
          <Card className="w-full">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Transfer List</CardTitle>
              {/* This button now opens a modal */}
              <Button onClick={handleSummaryClick} disabled={transfers.length === 0} className="bg-blue-600 text-white hover:bg-blue-700">
                Total Transfer Amount: ₹ {totalAmount.toLocaleString('en-IN')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">#</TableHead><TableHead>Sender Name</TableHead>
                      <TableHead>Receiver Name</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="h-24 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-500" /></TableCell></TableRow>
                    ) : transfers.length > 0 ? (
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
                      <TableRow><TableCell colSpan={5} className="h-24 text-center">No results.</TableCell></TableRow>
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
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Generating Report</DialogTitle><DialogDescription>Please wait a moment.</DialogDescription></DialogContent></Dialog>
      
      {/* Summary Modal */}
      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer Summary for {format(date, "dd-MM-yyyy")}</DialogTitle>
            <DialogDescription>A detailed breakdown of the point transfers for the selected date.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Transfer Amount:</span> <span className="font-semibold text-green-600">₹{totalAmount.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Number of Transfers:</span> <span className="font-semibold">{transfers.length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Highest Single Transfer:</span> <span className="font-semibold">₹{Math.max(...transfers.map(t => t.amount)).toLocaleString('en-IN')}</span></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransferPointReport;