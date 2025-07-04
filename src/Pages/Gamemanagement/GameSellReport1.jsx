import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// A reusable date input component.
const DateInput = ({ id, value, onChange, label }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <div className="relative mt-1">
      <Input
        id={id}
        name="date"
        value={value}
        onChange={onChange}
        className="pr-10"
        placeholder="DD-MM-YYYY"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  </div>
);

// A new component to display the fetched report data cleanly.
const ReportDisplay = ({ data, filters }) => (
  <div className="w-full text-left p-4">
    <CardTitle className="mb-4 text-center">
      Sell Report for {filters.gameName} on {filters.date}
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
  // State for filter values
  const [filters, setFilters] = useState({
    date: '29-06-2025',
    gameName: '',
    gameType: 'all',
  });
  
  // --- NEW: State for modals and data fetching ---
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  // Updated handler for form submission to manage modals
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (!filters.gameName) {
      setError("Please select a Game Name to generate a report.");
      return;
    }

    // 2. Start Loading
    setIsLoading(true);
    setError(null);
    setReportData(null); // Clear previous report
    console.log("Fetching Starline Sell Report with filters:", filters);

    // 3. Simulate API call
    setTimeout(() => {
      // In a real app, you would fetch data here.
      // We'll use our mock data for the demo.
      setReportData(MOCK_REPORT_DATA);
      setIsLoading(false); // Stop loading
    }, 2000); // 2-second delay
  };
  
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Starline Sell Report Filter Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-serif text-gray-700">Starline Sell Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <DateInput
                id="report-date"
                label="Date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
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
        
        {/* Report results card - now with conditional rendering */}
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

      {/* 1. Loading Modal (optional, since button has a spinner, but good for blocking UI) */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" hideCloseButton>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Generating Report</DialogTitle>
            <DialogDescription>Please wait a moment.</DialogDescription>
        </DialogContent>
      </Dialog>
      
      {/* 2. Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription className="pt-2">
              {error}
            </DialogDescription>
          </DialogHeader>
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