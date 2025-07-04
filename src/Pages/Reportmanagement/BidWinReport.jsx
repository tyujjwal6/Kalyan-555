import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"; // Import Loader2
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

// --- Mock Data and Components ---
const gameOptions = [
    { id: "game1", name: "Starline" },
    { id: "game2", name: "King Bazar" },
    { id: "game3", name: "Disawar" },
    { id: "game4", name: "Gali" },
];

const MOCK_REPORT_DATA = {
    totalBids: 543,
    totalWinAmount: 89500,
    highestWinner: { name: "Player_007", amount: 12500 },
    mostCommonWinningDigit: "9",
};

// New component to display the report results cleanly
const ReportDisplay = ({ data, filters }) => (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>Report for {filters.gameName} on {format(filters.reportDate, "dd-MM-yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Total Bids</p>
                    <p className="text-2xl font-bold">{data.totalBids.toLocaleString()}</p>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Total Win Amount</p>
                    <p className="text-2xl font-bold text-green-600">₹{data.totalWinAmount.toLocaleString()}</p>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Highest Winner</p>
                    <p className="text-lg font-semibold">{data.highestWinner.name}</p>
                    <p className="text-md text-slate-600">(₹{data.highestWinner.amount.toLocaleString()})</p>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Most Common Winning Digit</p>
                    <p className="text-2xl font-bold">{data.mostCommonWinningDigit}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const BidWinReport = () => {
  // State for form fields
  const [date, setDate] = useState(new Date(2025, 5, 30)); 
  const [gameName, setGameName] = useState("");

  // --- NEW: State for modals and data fetching ---
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updated form submission handler with modal logic
  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. Validation
    if (!gameName) {
      setError("Please select a game name to generate a report.");
      return;
    }

    // 2. Start Loading
    setIsLoading(true);
    setReportData(null);
    setError(null);

    const formData = {
      reportDate: date ? format(date, "yyyy-MM-dd") : null,
      gameName: gameName,
    };
    console.log("Submitting form with data:", formData);

    // 3. Simulate API Call
    setTimeout(() => {
      console.log("Dummy API call successful.");
      setReportData(MOCK_REPORT_DATA);
      setIsLoading(false);
    }, 2000); // 2-second delay
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Winning History Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                {/* Date Picker */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                  <Popover>
                    <PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-full sm:w-[280px] justify-start text-left font-normal",!date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                {/* Game Name Select */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="game-name" className="text-sm font-medium text-gray-700">Game Name</label>
                  <Select onValueChange={setGameName} value={gameName}>
                    <SelectTrigger id="game-name" className="w-full sm:w-[280px]"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger>
                    <SelectContent>{gameOptions.map((game) => (<SelectItem key={game.id} value={game.name}>{game.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                {/* Submit Button */}
                <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Generating...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Conditional rendering for the report display */}
          {reportData && !isLoading && <ReportDisplay data={reportData} filters={{ reportDate: date, gameName }} />}
        </div>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* Loading Modal */}
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Generating Report</DialogTitle><DialogDescription>Please wait a moment.</DialogDescription></DialogContent></Dialog>
      
      {/* Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription className="pt-2">{error}</DialogDescription>
          </DialogHeader>
          <DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BidWinReport;