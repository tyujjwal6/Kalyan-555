import React, { useState } from 'react';
import { format } from "date-fns"; // For formatting dates
import { Calendar as CalendarIcon } from 'lucide-react';
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
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
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

const DeclareResult = () => {
  // State for the main form - using Date object for dates
  const [resultDate, setResultDate] = useState(new Date());
  const [gameName, setGameName] = useState('');
  const [session, setSession] = useState('');

  // State for the history filter - using Date object
  const [historyFilterDate, setHistoryFilterDate] = useState(new Date());

  // State for modals
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // State to hold the specific game being edited or deleted
  const [selectedGame, setSelectedGame] = useState(null);

  // State for the form inside the "Declare Result" modal
  const [declareFormData, setDeclareFormData] = useState({ openPana: '', closePana: '' });

  // State for the form inside the "Edit Result" modal
  const [editFormData, setEditFormData] = useState({ openPana: '', closePana: '' });

  const gameHistory = [
    { id: 1, gameName: 'LAXMI MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:45:22 AM', closeDeclareDate: '29 Jun 2025 11:45:44 AM', openPana: '400-4', closePana: '9-333' },
    { id: 2, gameName: 'KARNATAKA DAY', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:46:09 AM', closeDeclareDate: '29 Jun 2025 11:46:26 AM', openPana: '125-8', closePana: '6-358' },
    { id: 3, gameName: 'MILAN MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:46:46 AM', closeDeclareDate: '29 Jun 2025 11:47:00 AM', openPana: '134-8', closePana: '2-129' },
    { id: 4, gameName: 'KALYAN MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:47:17 AM', closeDeclareDate: '29 Jun 2025 12:12:41 PM', openPana: '235-0', closePana: '8-279' },
    { id: 5, gameName: 'MADHUR MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:47:30 AM', closeDeclareDate: '29 Jun 2025 01:06:12 PM', openPana: '156-2', closePana: '4-347' },
    { id: 6, gameName: 'SRIDEVI', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:52:45 AM', closeDeclareDate: '29 Jun 2025 01:08:28 PM', openPana: '134-8', closePana: '7-458' },
    { id: 7, gameName: 'MADHUR DAY', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 01:49:27 PM', closeDeclareDate: 'N/A', openPana: '378-8', closePana: '*-***' },
  ];

  // --- Handlers to open modals ---

  const handleGoClick = (e) => {
    e.preventDefault();
    if (!gameName || !session) {
      alert("Please select a Game Name and Session.");
      return;
    }
    setDeclareFormData({ openPana: '', closePana: '' });
    setIsDeclareModalOpen(true);
  };
  
  const handleEditClick = (game) => {
    setSelectedGame(game);
    setEditFormData({ openPana: game.openPana, closePana: game.closePana });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (game) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  // --- Handlers for modal actions ---

  const handleConfirmDeclare = () => {
    const payload = {
      resultDate: format(resultDate, "yyyy-MM-dd"), // Format date for API
      gameName,
      session,
      ...declareFormData,
    };
    console.log("Declaring result with data:", payload);
    alert(`Dummy API call: Declaring result for ${payload.gameName}. Open: ${payload.openPana}, Close: ${payload.closePana}`);
    setIsDeclareModalOpen(false);
  };

  const handleConfirmEdit = () => {
    if (!selectedGame) return;
    const payload = {
      gameId: selectedGame.id,
      gameName: selectedGame.gameName,
      ...editFormData,
    };
    console.log("Saving edited result:", payload);
    alert(`Dummy API call: Updated result for ${payload.gameName}. Open: ${payload.openPana}, Close: ${payload.closePana}`);
    setIsEditModalOpen(false);
  };
  
  const handleConfirmDelete = () => {
    if (!selectedGame) return;
    const payload = { gameId: selectedGame.id, gameName: selectedGame.gameName };
    console.log("Deleting result:", payload);
    alert(`Dummy API call: Deleting result for ${payload.gameName} (ID: ${payload.gameId})`);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* Select Game Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Select Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGoClick} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
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
                    <SelectItem value="LAXMI MORNING">LAXMI MORNING</SelectItem>
                    <SelectItem value="KARNATAKA DAY">KARNATAKA DAY</SelectItem>
                    {/* Add other games here */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="session" className="text-sm font-medium">Session</Label>
                <Select value={session} onValueChange={setSession}>
                  <SelectTrigger id="session" className="mt-1">
                    <SelectValue placeholder="-Select Session-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Go</Button>
            </form>
          </CardContent>
        </Card>

        {/* Game History Table */}
        <Card className="mt-8">
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
                    <TableHead>Open Declare</TableHead>
                    <TableHead>Close Declare</TableHead>
                    <TableHead>Open Pana</TableHead>
                    <TableHead>Close Pana</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gameHistory.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.id}</TableCell>
                      <TableCell className="font-medium">{game.gameName}</TableCell>
                      <TableCell>{game.resultDate}</TableCell>
                      <TableCell>{game.openDeclareDate}</TableCell>
                      <TableCell>{game.closeDeclareDate}</TableCell>
                      <TableCell><span className="font-bold text-green-600">{game.openPana}</span></TableCell>
                      <TableCell><span className="font-bold text-green-600">{game.closePana}</span></TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" onClick={() => handleEditClick(game)}>Edit</Button>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Declare Result for {gameName}</DialogTitle>
            <DialogDescription>
              Enter the Open and Close Pana for the game on {resultDate ? format(resultDate, "PPP") : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="openPana" className="text-right">Open Pana</Label>
              <Input
                id="openPana"
                value={declareFormData.openPana}
                onChange={(e) => setDeclareFormData({ ...declareFormData, openPana: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 123-6"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="closePana" className="text-right">Close Pana</Label>
              <Input
                id="closePana"
                value={declareFormData.closePana}
                onChange={(e) => setDeclareFormData({ ...declareFormData, closePana: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 8-459"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="button" onClick={handleConfirmDeclare}>Declare Result</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Edit Result Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Result for {selectedGame?.gameName}</DialogTitle>
            <DialogDescription>Modify the Open and Close Pana values and click Save.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editOpenPana" className="text-right">Open Pana</Label>
              <Input
                id="editOpenPana"
                value={editFormData.openPana}
                onChange={(e) => setEditFormData({ ...editFormData, openPana: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editClosePana" className="text-right">Close Pana</Label>
              <Input
                id="editClosePana"
                value={editFormData.closePana}
                onChange={(e) => setEditFormData({ ...editFormData, closePana: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="button" onClick={handleConfirmEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the result for <span className="font-semibold">{selectedGame?.gameName}</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeclareResult;