import React, { useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils"; 

// Lucide React Icons
import { Calendar as CalendarIcon, Activity, Wallet, Loader2 } from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
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
const MOCK_RESULTS = [
    { id: 1, userName: 'Player_101', bidPoints: 50, winningAmount: 4750, type: 'Open Pana', bidTxId: 'TXN-001', status: 'Active' },
    { id: 2, userName: 'User_ABC', bidPoints: 100, winningAmount: 9500, type: 'Open Pana', bidTxId: 'TXN-002', status: 'Active' },
    { id: 3, userName: 'ProGamer', bidPoints: 20, winningAmount: 1900, type: 'Open Pana', bidTxId: 'TXN-003', status: 'Active' },
];

const MOCK_SUMMARY = {
    totalBid: 170,
    totalWinning: 16150,
};

const WinningPrediction3 = () => {
  const [date, setDate] = useState(new Date('2025-06-30'));
  const [gameName, setGameName] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [openPana, setOpenPana] = useState("");
  
  // --- NEW: State for modals, data, and loading status ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResults, setPredictionResults] = useState([]);
  const [summary, setSummary] =useState({ totalBid: 0, totalWinning: 0 });
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  // Updated submit handler with modal logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (!date || !gameName || !sessionTime || !openPana) {
      setError("Please fill out all fields to submit a prediction.");
      return;
    }
    
    // 2. Start Loading
    setIsLoading(true);
    setError(null);
    setPredictionResults([]);
    setSummary({ totalBid: 0, totalWinning: 0 });
    
    const formData = { date: format(date, "dd-MM-yyyy"), gameName, sessionTime, openPana };
    console.log("Submitting prediction:", formData);

    // 3. Simulate API Call
    setTimeout(() => {
      console.log("Dummy API call successful!");
      setPredictionResults(MOCK_RESULTS);
      setSummary(MOCK_SUMMARY);
      setIsLoading(false);
    }, 2000); // 2-second delay
  };

  // --- NEW: Handlers for the Action (Hold) modal ---
  const handleHoldClick = (prediction) => {
    setSelectedPrediction(prediction);
    setIsHoldModalOpen(true);
  };
  
  const handleConfirmHold = () => {
    if (!selectedPrediction) return;
    console.log(`Holding prediction ID: ${selectedPrediction.bidTxId}`);
    setPredictionResults(prev => 
      prev.map(p => p.id === selectedPrediction.id ? { ...p, status: 'On Hold' } : p)
    );
    setIsHoldModalOpen(false);
  };


  return (
    <>
      <div className="bg-[#f8f9fa] min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-full mx-auto space-y-6">
          <Card className="shadow-sm">
            <CardHeader><CardTitle className="text-xl font-bold text-gray-800">Winning prediction</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                  {/* Form fields... */}
                  <div className="space-y-2"><Label htmlFor="date" className="font-semibold text-gray-700">Date</Label><Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent></Popover></div>
                  <div className="space-y-2"><Label htmlFor="game-name" className="font-semibold text-gray-700">Game Name</Label><Select onValueChange={setGameName} value={gameName}><SelectTrigger id="game-name" className="w-full"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger><SelectContent><SelectItem value="kalyan_morning">Kalyan Morning</SelectItem><SelectItem value="milan_day">Milan Day</SelectItem><SelectItem value="rajdhani_night">Rajdhani Night</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="session-time" className="font-semibold text-gray-700">Session Time</Label><Select onValueChange={setSessionTime} value={sessionTime}><SelectTrigger id="session-time" className="w-full"><SelectValue placeholder="-Select Market Time-" /></SelectTrigger><SelectContent><SelectItem value="open">Open</SelectItem><SelectItem value="close">Close</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="open-pana" className="font-semibold text-gray-700">Open Pana</Label><Select onValueChange={setOpenPana} value={openPana}><SelectTrigger id="open-pana" className="w-full"><SelectValue placeholder="Select open number" /></SelectTrigger><SelectContent>{Array.from({ length: 100 }, (_, i) => String(i + 100).padStart(3, '0')).map(num => (<SelectItem key={num} value={num}>{num}</SelectItem>))}</SelectContent></Select></div>
                  
                  <Button type="submit" className="w-full bg-[#007bff] hover:bg-[#0069d9] text-white h-10" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader><CardTitle className="text-xl font-bold text-gray-800">Winning Prediction List</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-slate-100 py-2 px-4 rounded-lg text-sm font-medium text-gray-700"><Activity className="h-5 w-5 text-gray-600" /><span>Total Bid Amount</span><span className="font-bold">{summary.totalBid.toLocaleString()}</span></div>
                <div className="flex items-center space-x-2 bg-slate-100 py-2 px-4 rounded-lg text-sm font-medium text-gray-700"><Wallet className="h-5 w-5 text-gray-600" /><span>Total Winning Amount</span><span className="font-bold">₹{summary.totalWinning.toLocaleString()}</span></div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>#</TableHead><TableHead>User Name</TableHead><TableHead>Bid Points</TableHead>
                      <TableHead>Winning Amt.</TableHead><TableHead>Type</TableHead><TableHead>Bid TX ID</TableHead>
                      <TableHead>Status</TableHead><TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={8} className="text-center py-16"><Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                    ) : predictionResults.length > 0 ? (
                      predictionResults.map((result, index) => (
                        <TableRow key={result.id}>
                          <TableCell>{index + 1}</TableCell><TableCell>{result.userName}</TableCell><TableCell>{result.bidPoints}</TableCell>
                          <TableCell>₹{result.winningAmount.toLocaleString()}</TableCell><TableCell>{result.type}</TableCell><TableCell>{result.bidTxId}</TableCell>
                          <TableCell><Badge variant={result.status === 'On Hold' ? 'secondary' : 'default'}>{result.status}</Badge></TableCell>
                          <TableCell><Button variant="outline" size="sm" onClick={() => handleHoldClick(result)} disabled={result.status === 'On Hold'}>Hold</Button></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={8} className="text-center text-gray-500 py-16">There are no records to display</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* --- MODALS SECTION --- */}
      <Dialog open={isLoading}><DialogContent className="sm:max-w-xs text-center" hideCloseButton><Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" /><DialogTitle className="mt-4">Calculating Prediction</DialogTitle></DialogContent></Dialog>
      <Dialog open={!!error} onOpenChange={() => setError(null)}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle className="text-red-600">Action Required</DialogTitle><DialogDescription className="pt-2">{error}</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter></DialogContent></Dialog>
      <Dialog open={isHoldModalOpen} onOpenChange={() => setIsHoldModalOpen(false)}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Confirm Action</DialogTitle><DialogDescription>Are you sure you want to put the prediction with Bid ID <span className="font-semibold">{selectedPrediction?.bidTxId}</span> on hold?</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmHold}>Confirm & Hold</Button></DialogFooter></DialogContent></Dialog>
    </>
  );
};

export default WinningPrediction3;