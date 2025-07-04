import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'; // Import Loader2 for spinner

// A reusable date input component to keep the code clean and consistent.
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

// Mock data to display after a successful "API call"
const MOCK_WINNING_HISTORY = [
    { id: 1, userName: 'player_007', gameName: 'Starline Game 1', gameType: 'Single', pana: 'N/A', digit: '4', points: '100', amount: '950', txId: 'WIN-1023', txDate: '29 Jun 2025' },
    { id: 2, userName: 'user_x', gameName: 'Starline Game 1', gameType: 'Double', pana: '22', digit: 'N/A', points: '50', amount: '4750', txId: 'WIN-1024', txDate: '29 Jun 2025' },
    { id: 3, userName: 'pro_gamer', gameName: 'Starline Game 1', gameType: 'Single', pana: 'N/A', digit: '8', points: '200', amount: '1900', txId: 'WIN-1025', txDate: '29 Jun 2025' },
];

const WinningReport = () => {
  // State for filter values
  const [filters, setFilters] = useState({
    date: '29-06-2025',
    gameName: '',
  });
  
  // --- NEW: State for modals and data ---
  const [winningHistory, setWinningHistory] = useState([]); // To hold the fetched data
  const [isLoading, setIsLoading] = useState(false); // To control the loading modal
  const [error, setError] = useState(null); // To control the error modal

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
      setError("Please select a Game Name to generate the report.");
      return;
    }

    // 2. Start Loading Process
    setIsLoading(true);
    setError(null);
    setWinningHistory([]); // Clear previous results
    console.log("Fetching Winning Report with filters:", filters);

    // 3. Simulate API call
    setTimeout(() => {
      // On success, populate data and stop loading
      setWinningHistory(MOCK_WINNING_HISTORY);
      setIsLoading(false);
    }, 1500); // 1.5-second delay
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Starline Winning Report Filter Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-serif text-gray-700">Starline Winning Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
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
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Winning History List Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Winning History List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead>Game Name</TableHead>
                    <TableHead>Game Type</TableHead>
                    <TableHead>Pana</TableHead>
                    <TableHead>Digit</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Tx Id</TableHead>
                    <TableHead>Tx Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {winningHistory.length > 0 ? (
                    winningHistory.map((win) => (
                      <TableRow key={win.id}>
                        <TableCell className="font-medium">{win.userName}</TableCell>
                        <TableCell>{win.gameName}</TableCell>
                        <TableCell>{win.gameType}</TableCell>
                        <TableCell>{win.pana}</TableCell>
                        <TableCell>{win.digit}</TableCell>
                        <TableCell>{win.points}</TableCell>
                        <TableCell className="font-semibold text-green-600">₹{win.amount}</TableCell>
                        <TableCell>{win.txId}</TableCell>
                        <TableCell>{win.txDate}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="9" className="text-center text-gray-500 py-10">
                        {isLoading ? "Fetching data..." : "No winning history found. Please use the filters above to generate a report."}
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
      
      {/* 1. Loading Modal */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" hideCloseButton>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Fetching Report</DialogTitle>
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

export default WinningReport;