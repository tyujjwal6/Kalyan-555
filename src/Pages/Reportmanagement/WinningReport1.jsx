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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";


// 1. Define your form schema with Zod
const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  gameName: z.string().optional(),
  marketTime: z.string().optional(),
});

// Mock data to display after a successful "API call"
const MOCK_HISTORY_DATA = [
  { id: 1, userName: "Player01", gameName: "Super Loto", gameType: "Daily", openPana: "123", openDigit: "6", closePana: "456", closeDigit: "5", points: 10, amount: 950, txId: "TXN12345", txDate: "30-06-2025" },
  { id: 2, userName: "User_GG", gameName: "Super Loto", gameType: "Weekly", openPana: "789", openDigit: "4", closePana: "111", closeDigit: "3", points: 20, amount: 1900, txId: "TXN12346", txDate: "30-06-2025" },
  { id: 3, userName: "WinnerX", gameName: "Super Loto", gameType: "Daily", openPana: "225", openDigit: "9", closePana: "330", closeDigit: "6", points: 5, amount: 475, txId: "TXN12347", txDate: "30-06-2025" }
];

const WinningReport = () => {
  // --- NEW: State for modals, data, and loading status ---
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // 2. Define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date("2025-06-30T00:00:00"),
      gameName: "",
      marketTime: "",
    },
  });

  // 3. Define the submit handler with modal logic
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setHistoryData([]); // Clear previous results

    const formattedData = {
      date: format(values.date, "yyyy-MM-dd"),
      gameName: values.gameName || 'all',
      marketTime: values.marketTime || 'all',
    };
    console.log("Submitting to dummy API with data:", formattedData);

    // Simulate API call
    setTimeout(() => {
        console.log("Dummy API response received.");
        setHistoryData(MOCK_HISTORY_DATA);
        setIsLoading(false);
    }, 2000); // 2-second delay
  };

  // --- NEW: Handlers for the delete action ---
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    console.log("Deleting item:", itemToDelete);
    setHistoryData(currentData => currentData.filter(item => item.id !== itemToDelete.id));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const tableHeaders = [
    "User Name", "Game Name", "Game Type", "Open Pana", "Open digit", 
    "Close Pana", "Close Digit", "Points", "Amount", "Tx Id", "Tx Date", "Action"
  ];

  return (
    <>
      <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center gap-6">
        <Card className="w-full max-w-7xl shadow-sm">
          <CardHeader><CardTitle className="text-xl font-bold">Winning History Report</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-between text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "dd-MM-yyyy") : <span>Pick a date</span>}<CalendarIcon className="h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gameName" render={({ field }) => (
                    <FormItem><FormLabel>Game Name</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-Select Game Name-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="game1">Super Loto</SelectItem><SelectItem value="game2">Mega Jackpot</SelectItem><SelectItem value="game3">Lucky 7</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="marketTime" render={({ field }) => (
                    <FormItem><FormLabel>Market Time</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-Select Market Time-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="open">Open Market</SelectItem><SelectItem value="close">Close Market</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Fetching..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="w-full max-w-7xl shadow-sm">
          <CardHeader><CardTitle className="text-xl font-bold">Winning History List</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>{tableHeaders.map((header) => (<TableHead key={header} className="font-semibold text-black">{header}</TableHead>))}</TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                     <TableRow><TableCell colSpan={tableHeaders.length} className="h-24 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                  ) : historyData.length > 0 ? (
                    historyData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.userName}</TableCell><TableCell>{row.gameName}</TableCell><TableCell>{row.gameType}</TableCell>
                        <TableCell>{row.openPana}</TableCell><TableCell>{row.openDigit}</TableCell><TableCell>{row.closePana}</TableCell>
                        <TableCell>{row.closeDigit}</TableCell><TableCell>{row.points}</TableCell><TableCell>₹{row.amount}</TableCell>
                        <TableCell>{row.txId}</TableCell><TableCell>{row.txDate}</TableCell>
                        <TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteClick(row)}>Delete</Button></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={tableHeaders.length} className="h-24 text-center">No results found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Fetching Report</DialogTitle><DialogDescription>Please wait a moment.</DialogDescription></DialogContent></Dialog>
      <Dialog open={!!error} onOpenChange={() => setError(null)}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle className="text-red-600">Request Failed</DialogTitle><DialogDescription className="pt-2">{error}</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter></DialogContent></Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Are you sure you want to delete the winning entry for <span className="font-semibold">{itemToDelete?.userName}</span> (Tx ID: {itemToDelete?.txId})? This action cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmDelete}>Confirm Delete</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WinningReport;