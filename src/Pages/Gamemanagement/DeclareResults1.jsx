import React, { useState } from 'react';
import { format } from "date-fns"; //
import { Calendar as CalendarIcon } from 'lucide-react';

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
import { Calendar } from "@/components/ui/calendar"; // The actual calendar component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assumes you have this utility function from shadcn/ui setup

// A reusable DatePicker component based on shadcn/ui documentation.
// This provides a real calendar popup and fixes the crashing issue.
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


const DeclareResults = () => {
  // --- STATE MANAGEMENT ---
  // Use Date objects for dates, which is required for the Calendar component
  const [resultDate, setResultDate] = useState(new Date());
  const [gameName, setGameName] = useState('');
  const [historyFilterDate, setHistoryFilterDate] = useState(new Date());
  
  // State for modals
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // State to hold the game selected for deletion
  const [selectedGame, setSelectedGame] = useState(null);
  
  // State for the form inside the "Declare Result" modal
  const [declareFormData, setDeclareFormData] = useState({ number: '' });
  
  // --- MOCK DATA ---
  const gameHistory = [
    { id: 1, gameName: 'STARLINE-1', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 09:01:14 AM', number: '110-2' },
    { id: 2, gameName: 'STARLINE-2', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 10:09:03 AM', number: '115-7' },
    { id: 3, gameName: 'STARLINE-3', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:06:50 PM', number: '560-1' },
    { id: 4, gameName: 'STARLINE-4', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:08:41 PM', number: '158-4' },
    { id: 5, gameName: 'STARLINE-5', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 02:33:30 PM', number: '179-7' },
    { id: 6, gameName: 'STARLINE-6', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 03:49:28 PM', number: '157-3' },
  ];

  // --- MODAL HANDLERS ---
  
  // Handles the "Go" button click to open the declare result modal
  const handleGoClick = (e) => {
    e.preventDefault();
    if (!gameName) {
      alert("Please select a Game Name.");
      return;
    }
    setDeclareFormData({ number: '' }); // Reset form
    setIsDeclareModalOpen(true);
  };

  // Handles clicking the "Delete" button in the table
  const handleDeleteClick = (game) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  // Handles the final submission from the "Declare Result" modal
  const handleConfirmDeclare = () => {
    if (!declareFormData.number) {
        alert("Please enter the result number.");
        return;
    }
    const payload = { 
      resultDate: format(resultDate, "yyyy-MM-dd"), // Format date for API
      gameName, 
      ...declareFormData 
    };
    console.log("Declaring result with data:", payload);
    alert(`Dummy API call: Declaring result for ${payload.gameName} with number ${payload.number}`);
    setIsDeclareModalOpen(false); // Close modal on success
  };

  // Handles the final confirmation from the "Delete" modal
  const handleConfirmDelete = () => {
    if (!selectedGame) return;
    const payload = { gameId: selectedGame.id, gameName: selectedGame.gameName, action: 'delete' };
    console.log("Deleting result:", payload);
    alert(`Dummy API call: Deleting result for ${payload.gameName} (ID: ${payload.gameId})`);
    setIsDeleteModalOpen(false); // Close modal on success
  };


  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-8">
        {/* Select Game Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Select Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGoClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
              <DatePicker
                id="resultDate"
                label="Result Date"
                date={resultDate}
                setDate={setResultDate}
              />

              <div>
                <Label htmlFor="gameName" className="text-sm font-medium">Game Name</Label>
                <Select value={gameName} onValueChange={setGameName}>
                  <SelectTrigger id="gameName" className="mt-1">
                    <SelectValue placeholder="Select Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STARLINE-1">STARLINE-1</SelectItem>
                    <SelectItem value="STARLINE-2">STARLINE-2</SelectItem>
                    <SelectItem value="STARLINE-3">STARLINE-3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Go</Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Game Result History Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Game Result History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 w-full md:w-1/4">
               <DatePicker
                id="historyDate"
                label="Select Result Date"
                date={historyFilterDate}
                setDate={setHistoryFilterDate}
              />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Game Name</TableHead>
                    <TableHead>Result Date</TableHead>
                    <TableHead>Declare Date</TableHead>
                    <TableHead>Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gameHistory.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.id}</TableCell>
                      <TableCell className="font-medium">{game.gameName}</TableCell>
                      <TableCell>{game.resultDate}</TableCell>
                      <TableCell>{game.declareDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-green-600 min-w-[50px]">{game.number}</span>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(game)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}

      {/* 1. Declare Result Modal */}
      <Dialog open={isDeclareModalOpen} onOpenChange={setIsDeclareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Declare Result for {gameName}</DialogTitle>
            <DialogDescription>
              Enter the result number for the selected game and date.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="result-number" className="text-right">Result Number</Label>
              <Input
                id="result-number"
                value={declareFormData.number}
                onChange={(e) => setDeclareFormData({ number: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 123-6"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleConfirmDeclare}>Declare</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 2. Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the result for <span className="font-semibold">{selectedGame?.gameName}</span>.
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

export default DeclareResults;