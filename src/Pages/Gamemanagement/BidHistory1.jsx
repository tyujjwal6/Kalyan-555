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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Calendar } from "@/components/ui/calendar"; // The actual interactive calendar
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


// Mock data
const MOCK_BID_HISTORY = [
  { id: 1, userName: 'user_101', bidTxId: 'TXN738291', gameName: 'Game One', gameType: 'Single', digit: '5', paana: 'N/A', points: 50 },
  { id: 2, userName: 'user_204', bidTxId: 'TXN738292', gameName: 'Game One', gameType: 'Single', digit: '8', paana: 'N/A', points: 25 },
  { id: 3, userName: 'user_315', bidTxId: 'TXN738293', gameName: 'Game One', gameType: 'Double', digit: 'N/A', paana: '22', points: 100 },
];

const BidHistory = () => {
  // Use a Date object for the date filter
  const [filters, setFilters] = useState({
    date: new Date(),
    gameName: '',
    gameType: '',
  });

  const [bidHistoryData, setBidHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // A single handler for all filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!filters.gameName || !filters.gameType) {
      setError("Please select both a Game Name and a Game Type.");
      return;
    }

    setIsLoading(true);
    setBidHistoryData([]);
    setError(null);

    // Format the date to a string for the "API call"
    const apiFilters = {
      ...filters,
      date: format(filters.date, 'yyyy-MM-dd'),
    };
    console.log("Fetching Bid History Report with filters:", apiFilters);
    
    setTimeout(() => {
      setBidHistoryData(MOCK_BID_HISTORY);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Bid History Report Filter Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Bid History Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {/* Use the new DatePicker component */}
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
                    <SelectItem value="game1">Game One</SelectItem>
                    <SelectItem value="game2">Game Two</SelectItem>
                    <SelectItem value="game3">Game Three</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="game-type" className="text-sm font-medium">Game Type</Label>
                <Select value={filters.gameType} onValueChange={(value) => handleFilterChange('gameType', value)}>
                  <SelectTrigger id="game-type" className="mt-1">
                    <SelectValue placeholder="-Select Game Type-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="triple">Triple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-transparent select-none">.</Label> {/* Spacer label */}
                <Button type="submit" disabled={isLoading} className="w-full mt-1 bg-blue-600 hover:bg-blue-700">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Bid History List Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Bid History List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead>Bid TX ID</TableHead>
                    <TableHead>Game Name</TableHead>
                    <TableHead>Game Type</TableHead>
                    <TableHead>Digit</TableHead>
                    <TableHead>Paana</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bidHistoryData.length > 0 ? (
                    bidHistoryData.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.userName}</TableCell>
                        <TableCell>{bid.bidTxId}</TableCell>
                        <TableCell>{bid.gameName}</TableCell>
                        <TableCell>{bid.gameType}</TableCell>
                        <TableCell>{bid.digit}</TableCell>
                        <TableCell>{bid.paana}</TableCell>
                        <TableCell>{bid.points}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="7" className="text-center text-gray-500 py-10">
                        {isLoading ? "Fetching data..." : "No bid history found. Please use the filters to generate a report."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" onInteractOutside={(e) => e.preventDefault()}>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Fetching Report</DialogTitle>
            <DialogDescription>Please wait while we gather the data.</DialogDescription>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Validation Error</DialogTitle>
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

export default BidHistory;