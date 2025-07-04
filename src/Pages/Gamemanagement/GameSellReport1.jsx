import React, { useState } from 'react';
import { format } from "date-fns"; // For formatting dates
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils"; // A utility from shadcn for conditional class names

// Import shadcn/ui components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// A functional DatePicker component using Popover and Calendar
const DatePicker = ({ date, setDate, label, id }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal mt-1",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
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
);

// A new component to display the fetched report data cleanly.
// Updated to format the date object from filters.
const ReportDisplay = ({ data, filters }) => (
  <div className="w-full text-left p-4">
    <CardTitle className="mb-4 text-center">
      Sell Report for {filters.gameName} on {filters.date ? format(filters.date, "PPP") : ''}
    </CardTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReportItem label="Total Bids" value={data.totalBids.toLocaleString()} />
        <ReportItem label="Total Sell Amount" value={`₹ ${data.totalAmount.toLocaleString()}`} />
        <ReportItem label="Top Bid (Single)" value={`${data.topBids.single.digit} (${data.topBids.single.amount} pts)`} />
        <ReportItem label="Top Bid (Double)" value={`${data.topBids.double.pana} (${data.topBids.double.amount} pts)`} />
    </div>
  </div>
);

const ReportItem = ({ label, value }) => (
    <div className="p-3 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
);

// Mock data to be returned by our simulated API call
const MOCK_REPORT_DATA = {
    totalBids: 1245,
    totalAmount: 45850,
    topBids: {
        single: { digit: '7', amount: 500 },
        double: { pana: '22', amount: 300 },
    }
};

const GameSellReport = () => {
  // State for filter values - Use Date object for date
  const [filters, setFilters] = useState({
    date: new Date(),
    gameName: '',
    gameType: 'all',
  });
  
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!filters.gameName) {
      setError("Please select a Game Name to generate a report.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setReportData(null);

    // Format date to a string for the API/console log
    const apiFilters = {
        ...filters,
        date: format(filters.date, 'yyyy-MM-dd')
    };
    console.log("Fetching Starline Sell Report with filters:", apiFilters);

    setTimeout(() => {
      setReportData(MOCK_REPORT_DATA);
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-serif text-gray-700">Starline Sell Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {/* Use the new functional DatePicker */}
              <DatePicker
                id="report-date"
                label="Date"
                date={filters.date}
                setDate={(date) => handleFilterChange('date', date)}
              />

              <div>
                <Label htmlFor="game-name" className="text-sm font-medium">Game Name</Label>
                <Select value={filters.gameName} onValueChange={(value) => handleFilterChange('gameName', value)}>
                  <SelectTrigger id="game-name" className="mt-1">
                    <SelectValue placeholder="-Select Game Name-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Starline Game 1">Starline Game 1</SelectItem>
                    <SelectItem value="Starline Game 2">Starline Game 2</SelectItem>
                    <SelectItem value="Starline Game 3">Starline Game 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="game-type" className="text-sm font-medium">Game Type</Label>
                <Select value={filters.gameType} onValueChange={(value) => handleFilterChange('gameType', value)}>
                  <SelectTrigger id="game-type" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Generating...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="shadow-md min-h-[200px] flex items-center justify-center">
            {reportData ? (
                <ReportDisplay data={reportData} filters={filters} />
            ) : (
                <CardContent className="text-center text-gray-500">
                    <p>
                      {isLoading 
                        ? 'Fetching report data...' 
                        : 'The sell report will be displayed here after submission.'}
                    </p>
                </CardContent>
            )}
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" onInteractOutside={(e) => e.preventDefault()}>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Generating Report</DialogTitle>
            <DialogDescription>Please wait a moment.</DialogDescription>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription className="pt-2">
              {error}
            </DialogDescription>
          </DialogHeader> {/* <-- FIXED: Changed </Header> to </DialogHeader> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameSellReport;