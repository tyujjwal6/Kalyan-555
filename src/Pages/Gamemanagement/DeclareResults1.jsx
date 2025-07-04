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
import { Calendar as CalendarIcon } from 'lucide-react';

// A reusable date input component to keep the code clean and consistent.
const DateInput = ({ id, value, onChange, label }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <div className="relative mt-1">
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className="pr-10"
        placeholder="DD-MM-YYYY"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  </div>
);

const DeclareResults = () => {
  // --- STATE MANAGEMENT ---
  const [selectGameData, setSelectGameData] = useState({
    resultDate: '29-06-2025',
    gameName: '',
  });
  const [historyFilterDate, setHistoryFilterDate] = useState('29-06-2025');
  
  // --- NEW: State for modals ---
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
    if (!selectGameData.gameName) {
      alert("Please select a Game Name.");
      return;
    }
    setDeclareFormData({ number: '' }); // Reset form
    setIsDeclareModalOpen(true);
  };

  // Handles clicking the "Delete" button in the table to open the confirmation modal
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
    const payload = { ...selectGameData, ...declareFormData };
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
            {/* Updated form to trigger the modal */}
            <form onSubmit={handleGoClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
              <DateInput
                id="resultDate"
                label="Result Date"
                value={selectGameData.resultDate}
                onChange={(e) => setSelectGameData(prev => ({...prev, resultDate: e.target.value}))}
              />

              <div>
                <Label htmlFor="gameName" className="text-sm font-medium">Game Name</Label>
                <Select value={selectGameData.gameName} onValueChange={(value) => setSelectGameData(prev => ({ ...prev, gameName: value }))}>
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
              <DateInput
                id="historyDate"
                label="Select Result Date"
                value={historyFilterDate}
                onChange={(e) => setHistoryFilterDate(e.target.value)}
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
                          {/* Updated button to trigger the modal */}
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
            <DialogTitle>Declare Result for {selectGameData.gameName}</DialogTitle>
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