import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, TrendingUp, Landmark, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Function to generate numbers from "000" to "999"
const generateNumbers = () => {
  return Array.from({ length: 1000 }, (_, i) => i.toString().padStart(3, '0'));
};

// --- MOCK DATA FOR DEMONSTRATION ---
const MOCK_PREDICTION_RESULTS = [
    { userName: 'user_123', bidPoints: 50, winningAmount: 4750, type: 'Single', bidTxId: 'BID-9876' },
    { userName: 'player_one', bidPoints: 10, winningAmount: 950, type: 'Single', bidTxId: 'BID-9877' },
    { userName: 'ace_gamer', bidPoints: 100, winningAmount: 9500, type: 'Single', bidTxId: 'BID-9878' },
];
const MOCK_SUMMARY = {
    totalBid: 160,
    totalWinning: 15200,
};

const WinningPrediction5 = () => {
  // State for form data
  const [formData, setFormData] = useState({
    date: new Date('2025-06-29'),
    gameName: '',
    number: '000',
  });

  // --- NEW: State for modals, data, and loading/error states ---
  const [predictionResults, setPredictionResults] = useState([]);
  const [summary, setSummary] = useState({ totalBid: 0, totalWinning: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const numberOptions = generateNumbers();

  const handleValueChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  // --- NEW: Handler to open the details modal ---
  const handleRowClick = (prediction) => {
    setSelectedPrediction(prediction);
    setIsDetailsModalOpen(true);
  };

  // Updated handler to manage the modal-based submission flow
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 1. Validation
    if (!formData.gameName) {
      setError("Please select a Game Name before submitting.");
      return;
    }

    // 2. Start Loading
    setIsLoading(true);
    setError(null);
    setPredictionResults([]);
    setSummary({ totalBid: 0, totalWinning: 0 });
    console.log('Submitting form data to dummy API:', formData);

    // 3. Simulate API Call
    setTimeout(() => {
      // On success, update data and stop loading
      setPredictionResults(MOCK_PREDICTION_RESULTS);
      setSummary(MOCK_SUMMARY);
      setIsLoading(false);
    }, 2000); // 2-second delay
  };

  return (
    <>
      <div className="space-y-6">
        {/* Winning Prediction Form Card */}
        <Card>
          <CardHeader><CardTitle>Winning prediction</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date" variant="outline" className={cn('w-full justify-start text-left font-normal', !formData.date && 'text-muted-foreground')}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={formData.date} onSelect={(date) => handleValueChange('date', date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="game-name">Game Name</Label>
                <Select value={formData.gameName} onValueChange={(value) => handleValueChange('gameName', value)}>
                  <SelectTrigger id="game-name">
                    <SelectValue placeholder="-Select Game Name-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kalyan_morning">KALYAN MORNING</SelectItem>
                    <SelectItem value="milan_day">MILAN DAY</SelectItem>
                    <SelectItem value="rajdhani_night">RAJDHANI NIGHT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Select value={formData.number} onValueChange={(value) => handleValueChange('number', value)}>
                  <SelectTrigger id="number"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {numberOptions.map((num) => <SelectItem key={num} value={num}>{num}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Winning Prediction List Card */}
        <Card>
          <CardHeader><CardTitle>Winning Prediction List</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700">
                <TrendingUp className="h-5 w-5" />
                <span>Total Bid Amount</span>
                <span className="font-bold">{summary.totalBid.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700">
                <Landmark className="h-5 w-5" />
                <span>Total Winning Amount</span>
                <span className="font-bold">₹{summary.totalWinning.toLocaleString()}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Bid Points</TableHead>
                    <TableHead>Winning Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bid TX ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictionResults.length > 0 ? (
                    predictionResults.map((result, index) => (
                      <TableRow key={result.bidTxId} onClick={() => handleRowClick(result)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{result.userName}</TableCell>
                        <TableCell>{result.bidPoints}</TableCell>
                        <TableCell>₹{result.winningAmount.toLocaleString()}</TableCell>
                        <TableCell>{result.type}</TableCell>
                        <TableCell>{result.bidTxId}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        {isLoading ? 'Fetching prediction...' : 'No results to display. Please submit a prediction.'}
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
      
      {/* Loading Modal */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-xs text-center" hideCloseButton>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <DialogTitle className="mt-4">Calculating Prediction</DialogTitle>
            <DialogDescription>Please wait a moment.</DialogDescription>
        </DialogContent>
      </Dialog>
      
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

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Prediction Details</DialogTitle>
            <DialogDescription>Details for Bid ID: {selectedPrediction?.bidTxId}</DialogDescription>
          </DialogHeader>
          {selectedPrediction && (
            <div className="grid gap-2 py-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">User Name:</span> <span className="font-medium">{selectedPrediction.userName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bid Points:</span> <span className="font-medium">{selectedPrediction.bidPoints}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Winning Amount:</span> <span className="font-medium text-green-600">₹{selectedPrediction.winningAmount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Game Type:</span> <span className="font-medium">{selectedPrediction.type}</span></div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WinningPrediction5;