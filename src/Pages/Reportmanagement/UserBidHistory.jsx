import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

// --- MOCK DATA FOR DEMONSTRATION ---
const MOCK_BID_DATA = [
  { id: 1, userName: 'player_one', bidTxId: 'BID-1122', gameName: 'Kalyan Morning', gameType: 'Single Paana', session: 'Open', openPaana: '128', openDigit: '1', closePaana: '-', closeDigit: '-', points: 50 },
  { id: 2, userName: 'user_xyz', bidTxId: 'BID-1123', gameName: 'Kalyan Morning', gameType: 'Jodi Digit', session: 'Close', openPaana: '-', openDigit: '-', closePaana: '-', closeDigit: '34', points: 100 },
  { id: 3, userName: 'pro_gamer', bidTxId: 'BID-1124', gameName: 'Kalyan Morning', gameType: 'Double Paana', session: 'Close', openPaana: '-', openDigit: '-', closePaana: '228', closeDigit: '2', points: 20 },
];

const UserBidHistory = () => {
  // --- State for form, data, and modals ---
  const [date, setDate] = useState(new Date('2025-06-29'));
  const [gameName, setGameName] = useState('');
  const [gameType, setGameType] = useState('');
  
  const [bidHistory, setBidHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bidToDelete, setBidToDelete] = useState(null);

  // --- Handlers for modals and form submission ---
  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. Validation
    if (!date || !gameName || !gameType) {
      setError("Please select a date, game name, and game type.");
      return;
    }

    // 2. Start Loading
    setIsLoading(true);
    setBidHistory([]);
    setError(null);
    const formData = { date, gameName, gameType };
    console.log('Submitting Form Data:', formData);

    // 3. Simulate API Call
    setTimeout(() => {
      setBidHistory(MOCK_BID_DATA);
      setIsLoading(false);
    }, 1500);
  };

  const handleDeleteClick = (bid) => {
    setBidToDelete(bid);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (!bidToDelete) return;
    console.log('Deleting bid:', bidToDelete);
    // Filter out the deleted bid from the local state
    setBidHistory(currentHistory => currentHistory.filter(b => b.id !== bidToDelete.id));
    setIsDeleteModalOpen(false);
    setBidToDelete(null);
  };


  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-full mx-auto space-y-8">
          {/* Bid History Report Form Card */}
          <Card className="w-full">
            <CardHeader><CardTitle>Bid History Report</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild><Button variant={'outline'} className={cn('w-full justify-start text-left font-normal',!date && 'text-muted-foreground')}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}</Button></PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Game Name</Label>
                  <Select onValueChange={setGameName} value={gameName}><SelectTrigger><SelectValue placeholder="--Select Game Name--" /></SelectTrigger><SelectContent><SelectItem value="kalyan_morning">Kalyan Morning</SelectItem><SelectItem value="milan_day">Milan Day</SelectItem><SelectItem value="rajdhani_night">Rajdhani Night</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Game Type</Label>
                  <Select onValueChange={setGameType} value={gameType}><SelectTrigger><SelectValue placeholder="--Select Game Type--" /></SelectTrigger><SelectContent><SelectItem value="single_digit">Single Digit</SelectItem><SelectItem value="jodi_digit">Jodi Digit</SelectItem><SelectItem value="single_paana">Single Paana</SelectItem><SelectItem value="double_paana">Double Paana</SelectItem></SelectContent></Select>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bid History List Table Card */}
          <Card className="w-full">
            <CardHeader><CardTitle>Bid History List</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead><TableHead>Bid TX ID</TableHead><TableHead>Game Name</TableHead>
                      <TableHead>Game Type</TableHead><TableHead>Session</TableHead><TableHead>Open Paana</TableHead>
                      <TableHead>Open Digit</TableHead><TableHead>Close Paana</TableHead><TableHead>Close Digit</TableHead>
                      <TableHead>Points</TableHead><TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan="11" className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-500" /></TableCell></TableRow>
                    ) : bidHistory.length > 0 ? (
                      bidHistory.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell>{bid.userName}</TableCell><TableCell>{bid.bidTxId}</TableCell><TableCell>{bid.gameName}</TableCell>
                          <TableCell>{bid.gameType}</TableCell><TableCell>{bid.session}</TableCell><TableCell>{bid.openPaana}</TableCell>
                          <TableCell>{bid.openDigit}</TableCell><TableCell>{bid.closePaana}</TableCell><TableCell>{bid.closeDigit}</TableCell>
                          <TableCell>{bid.points}</TableCell>
                          <TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteClick(bid)}>Delete</Button></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan="11" className="text-center text-muted-foreground h-24">No bid history available for the selected criteria.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle className="text-red-600">Action Required</DialogTitle><DialogDescription className="pt-2">{error}</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter></DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the bid with ID <span className="font-semibold">{bidToDelete?.bidTxId}</span> for user <span className="font-semibold">{bidToDelete?.userName}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserBidHistory;