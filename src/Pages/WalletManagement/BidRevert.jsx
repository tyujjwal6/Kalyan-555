import React, { useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Assumes shadcn/ui setup

// --- NEW: Import Loader2 for spinner ---
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// --- NEW: Import Dialog components ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Dummy data for the game list dropdown
const dummyGames = [
  { id: 'game_1', name: 'Super Lotto' },
  { id: 'game_2', name: 'Mega Millions' },
  { id: 'game_3', name: 'Powerball' },
  { id: 'game_4', name: 'Daily Spin' },
];

// Dummy data to simulate API response for the bid list
const dummyBidResponse = [
    { id: 1, userName: 'PlayerOne', bidPoints: 500, type: 'Single' },
    { id: 2, userName: 'HighRoller', bidPoints: 1200, type: 'Jodi' },
    { id: 3, userName: 'LuckyUser', bidPoints: 250, type: 'Panna' },
];


const BidRevert = () => {
  // State for form fields
  const [date, setDate] = useState(new Date('2025-06-30'));
  const [gameName, setGameName] = useState('');
  
  // --- UPDATED: State for modals, data, and loading status ---
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRevertModalOpen, setIsRevertModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);


  // Updated form submission handler with modal logic
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Validation
    if (!date || !gameName) {
      setError('Please select a date and a game name.');
      return;
    }
    
    // 2. Start Loading
    setIsLoading(true);
    setBidList([]);
    setError(null);
    const formData = { date: format(date, 'yyyy-MM-dd'), gameId: gameName };
    console.log('Form Data to be sent to API:', formData);

    // 3. Simulate API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Dummy API call successful. Populating list.');
      setBidList(dummyBidResponse);
    } catch (apiError) {
      console.error('Error fetching bid revert list:', apiError);
      setError('An error occurred while fetching the list.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: Handlers for the Revert modal ---
  const handleRevertClick = (bid) => {
    setSelectedBid(bid);
    setIsRevertModalOpen(true);
  };

  const handleConfirmRevert = () => {
    if (!selectedBid) return;
    console.log("Reverting bid:", selectedBid);
    // Remove the bid from the list to simulate the revert action
    setBidList(currentList => currentList.filter(b => b.id !== selectedBid.id));
    setIsRevertModalOpen(false);
    setSelectedBid(null);
  };

  return (
    <>
      <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Card: Bid Revert Form */}
          <Card>
            <CardHeader><CardTitle className="text-xl font-bold">Bid Revert</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal",!date && "text-muted-foreground")} disabled={isLoading}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game-name">Game Name</Label>
                  <Select id="game-name" value={gameName} onValueChange={setGameName} disabled={isLoading}>
                    <SelectTrigger className="w-[240px]"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger>
                    <SelectContent>{dummyGames.map((game) => (<SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 text-white">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bottom Card: Bid Revert List */}
          <Card>
            <CardHeader><CardTitle className="text-xl font-bold">Bid Revert List</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead><TableHead>User Name</TableHead>
                    <TableHead>Bid Points</TableHead><TableHead>Type</TableHead>
                    {/* NEW: Action column */}
                    <TableHead className="text-right">Action</TableHead> 
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                      <TableRow><TableCell colSpan="5" className="h-24 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                  ) : bidList.length > 0 ? (
                    bidList.map((bid, index) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{bid.userName}</TableCell>
                        <TableCell>{bid.bidPoints}</TableCell>
                        <TableCell>{bid.type}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="sm" onClick={() => handleRevertClick(bid)}>Revert</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan="5" className="h-24 text-center">No results to display. Submit the form to fetch data.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* --- MODALS SECTION --- */}
      {/* Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="text-red-600">Action Required</DialogTitle><DialogDescription className="pt-2">{error}</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Revert Confirmation Modal */}
      <Dialog open={isRevertModalOpen} onOpenChange={setIsRevertModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Bid Revert</DialogTitle>
            <DialogDescription>
              Are you sure you want to revert the bid of <span className="font-semibold">{selectedBid?.bidPoints} points</span> for user <span className="font-semibold">{selectedBid?.userName}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleConfirmRevert}>Confirm Revert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BidRevert;