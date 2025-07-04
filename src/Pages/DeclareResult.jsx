import React, { useState, useEffect } from 'react';
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

// Reusable DateInput component
const DateInput = ({ id, value, onChange, label }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
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

const DeclareResult = () => {
  // State for the main form
  const [selectGameData, setSelectGameData] = useState({
    resultDate: '29-06-2025',
    gameName: '',
    session: '',
  });

  // State for the history filter
  const [historyFilterDate, setHistoryFilterDate] = useState('29-06-2025');

  // --- NEW: State for modals ---
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

  // --- NEW: Handlers to open modals ---

  const handleGoClick = (e) => {
    e.preventDefault();
    if (!selectGameData.gameName || !selectGameData.session) {
      alert("Please select a Game Name and Session.");
      return;
    }
    // Reset form and open the declare modal
    setDeclareFormData({ openPana: '', closePana: '' });
    setIsDeclareModalOpen(true);
  };
  
  const handleEditClick = (game) => {
    setSelectedGame(game);
    // Pre-fill edit form with existing data
    setEditFormData({ openPana: game.openPana, closePana: game.closePana });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (game) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  // --- NEW: Handlers for modal actions ---

  const handleConfirmDeclare = () => {
    const payload = {
      ...selectGameData,
      ...declareFormData,
    };
    console.log("Declaring result with data:", payload);
    alert(`Dummy API call: Declaring result for ${payload.gameName}. Open: ${payload.openPana}, Close: ${payload.closePana}`);
    setIsDeclareModalOpen(false); // Close modal on success
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
    setIsEditModalOpen(false); // Close modal on success
  };
  
  const handleConfirmDelete = () => {
    if (!selectedGame) return;
    const payload = { gameId: selectedGame.id, gameName: selectedGame.gameName };
    console.log("Deleting result:", payload);
    alert(`Dummy API call: Deleting result for ${payload.gameName} (ID: ${payload.gameId})`);
    setIsDeleteModalOpen(false); // Close modal on success
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
            {/* Updated form to use the new handler */}
            <form onSubmit={handleGoClick} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <DateInput
                id="resultDate"
                label="Result Date"
                value={selectGameData.resultDate}
                onChange={(e) => setSelectGameData({ ...selectGameData, resultDate: e.target.value })}
              />

              <div>
                <Label htmlFor="gameName" className="text-sm font-medium">Game Name</Label>
                <Select onValueChange={(value) => setSelectGameData({ ...selectGameData, gameName: value })}>
                  <SelectTrigger id="gameName" className="mt-1">
                    <SelectValue placeholder="Select Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LAXMI MORNING">LAXMI MORNING</SelectItem>
                    <SelectItem value="KARNATAKA DAY">KARNATAKA DAY</SelectItem>
                    <SelectItem value="MILAN MORNING">MILAN MORNING</SelectItem>
                    <SelectItem value="KALYAN MORNING">KALYAN MORNING</SelectItem>
                    <SelectItem value="MADHUR MORNING">MADHUR MORNING</SelectItem>
                    <SelectItem value="SRIDEVI">SRIDEVI</SelectItem>
                    <SelectItem value="MADHUR DAY">MADHUR DAY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="session" className="text-sm font-medium">Session</Label>
                <Select onValueChange={(value) => setSelectGameData({ ...selectGameData, session: value })}>
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
                    <TableHead>Open Declare Date</TableHead>
                    <TableHead>Close Declare Date</TableHead>
                    <TableHead>Open Pana</TableHead>
                    <TableHead>Close Pana</TableHead>
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600 min-w-[50px]">{game.openPana}</span>
                          {/* Updated buttons to call new handlers */}
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(game)}>Delete</Button>
                          <Button size="sm" onClick={() => handleEditClick(game)}>Edit</Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600 min-w-[50px]">{game.closePana}</span>
                          {game.closeDeclareDate !== 'N/A' && (
                            <>
                              {/* These buttons act on the entire game result, not just the 'close' part */}
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(game)}>Delete</Button>
                              <Button size="sm" onClick={() => handleEditClick(game)}>Edit</Button>
                            </>
                          )}
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
            <DialogTitle>Declare Result for {selectGameData.gameName}</DialogTitle>
            <DialogDescription>
              Enter the Open and Close Pana for the game on {selectGameData.resultDate}.
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmDeclare}>Declare Result</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Edit Result Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Result for {selectedGame?.gameName}</DialogTitle>
            <DialogDescription>
              Modify the Open and Close Pana values and click Save.
            </DialogDescription>
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeclareResult;