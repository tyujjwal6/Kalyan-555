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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from 'lucide-react';

// A helper component for creating sortable table headers.
const SortableHeader = ({ children }) => (
    <TableHead>
        <button className="flex items-center gap-1 font-semibold text-gray-700">
            {children}
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
        </button>
    </TableHead>
);

const GameName = () => {
    // Mock data for the table
    const games = [
        { id: 1, name: 'STARLINE-14', nameHindi: 'STARLINE-14', openTime: '11:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 2, name: 'STARLINE-13', nameHindi: 'STARLINE-13', openTime: '10:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 3, name: 'STARLINE-12', nameHindi: 'STARLINE-12', openTime: '09:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 4, name: 'STARLINE-11', nameHindi: 'STARLINE-11', openTime: '08:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 5, name: 'STARLINE-10', nameHindi: 'STARLINE-10', openTime: '07:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 6, name: 'STARLINE-9', nameHindi: 'STARLINE-9', openTime: '06:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 7, name: 'STARLINE-8', nameHindi: 'STARLINE-8', openTime: '05:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 8, name: 'STARLINE-7', nameHindi: 'STARLINE-7', openTime: '04:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 9, name: 'STARLINE-6', nameHindi: 'STARLINE-6', openTime: '03:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 10, name: 'STARLINE-1', nameHindi: 'STARLINE-1', openTime: '10:00 AM', status: 'Yes', marketStatus: 'Market Open' },
    ];

    // --- NEW: State for modals and forms ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMarketCloseModalOpen, setIsMarketCloseModalOpen] = useState(false);

    const [selectedGame, setSelectedGame] = useState(null); // To store game data for edit/close actions
    
    // State for the "Add Game" form
    const [addGameData, setAddGameData] = useState({ name: '', nameHindi: '', openTime: '' });
    // State for the "Edit Game" form
    const [editGameData, setEditGameData] = useState({ name: '', nameHindi: '', openTime: '' });


    // --- NEW: Handlers to open modals ---
    const handleAddClick = () => {
        setAddGameData({ name: '', nameHindi: '', openTime: '' }); // Reset form
        setIsAddModalOpen(true);
    };

    const handleEditClick = (game) => {
        setSelectedGame(game);
        setEditGameData({ name: game.name, nameHindi: game.nameHindi, openTime: game.openTime });
        setIsEditModalOpen(true);
    };

    const handleMarketCloseClick = (game) => {
        setSelectedGame(game);
        setIsMarketCloseModalOpen(true);
    };

    // --- NEW: Handlers for modal form submissions ---
    const handleConfirmAdd = () => {
        console.log("Adding new game:", addGameData);
        alert(`Dummy API Call: Adding game "${addGameData.name}"`);
        setIsAddModalOpen(false);
    };

    const handleConfirmEdit = () => {
        const payload = { gameId: selectedGame.id, ...editGameData };
        console.log("Saving edited game:", payload);
        alert(`Dummy API Call: Saving changes for "${payload.name}"`);
        setIsEditModalOpen(false);
    };
    
    const handleConfirmMarketClose = () => {
        const payload = { gameId: selectedGame.id, gameName: selectedGame.name };
        console.log("Closing market for game:", payload);
        alert(`Dummy API Call: Closing market for game "${payload.gameName}"`);
        setIsMarketCloseModalOpen(false);
    };


    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Starline Game Name List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="show-entries" className="text-sm font-normal shrink-0">Show</Label>
                                <Select defaultValue="10">
                                    <SelectTrigger id="show-entries" className="w-[80px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm">entries</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAddClick}>
                                    Add Game
                                </Button>
                                <div className="flex items-center space-x-2 w-full sm:w-auto">
                                    <Label htmlFor="search-games" className="text-sm font-normal shrink-0">Search:</Label>
                                    <Input id="search-games" className="w-full sm:w-auto" />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <SortableHeader>#</SortableHeader>
                                        <SortableHeader>Game Name</SortableHeader>
                                        <SortableHeader>Game Name Hindi</SortableHeader>
                                        <SortableHeader>Open Time</SortableHeader>
                                        <SortableHeader>Status</SortableHeader>
                                        <SortableHeader>Market Status</SortableHeader>
                                        <TableHead>Action</TableHead> {/* Action column usually isn't sortable */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {games.map((game) => (
                                        <TableRow key={game.id}>
                                            <TableCell>{game.id}</TableCell>
                                            <TableCell className="font-medium">{game.name}</TableCell>
                                            <TableCell>{game.nameHindi}</TableCell>
                                            <TableCell>{game.openTime}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">{game.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">{game.marketStatus}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {/* Updated buttons to trigger modals */}
                                                    <Button size="sm" onClick={() => handleEditClick(game)}>Edit</Button>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleMarketCloseClick(game)}>Market Close</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-600">
                                Showing 1 to 10 of 14 entries
                            </p>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="sm">Previous</Button>
                                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
                                <Button variant="outline" size="sm">2</Button>
                                <Button variant="outline" size="sm">Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- MODALS SECTION --- */}

            {/* 1. Add Game Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Game</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new game. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-name" className="text-right">Name</Label>
                            <Input id="add-name" value={addGameData.name} onChange={(e) => setAddGameData({...addGameData, name: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-name-hindi" className="text-right">Name (Hindi)</Label>
                            <Input id="add-name-hindi" value={addGameData.nameHindi} onChange={(e) => setAddGameData({...addGameData, nameHindi: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-open-time" className="text-right">Open Time</Label>
                            <Input id="add-open-time" value={addGameData.openTime} onChange={(e) => setAddGameData({...addGameData, openTime: e.target.value})} className="col-span-3" placeholder="e.g., 10:00 PM" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleConfirmAdd}>Save Game</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 2. Edit Game Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Game: {selectedGame?.name}</DialogTitle>
                        <DialogDescription>
                            Make changes to the game details below. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">Name</Label>
                            <Input id="edit-name" value={editGameData.name} onChange={(e) => setEditGameData({...editGameData, name: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name-hindi" className="text-right">Name (Hindi)</Label>
                            <Input id="edit-name-hindi" value={editGameData.nameHindi} onChange={(e) => setEditGameData({...editGameData, nameHindi: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-open-time" className="text-right">Open Time</Label>
                            <Input id="edit-open-time" value={editGameData.openTime} onChange={(e) => setEditGameData({...editGameData, openTime: e.target.value})} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleConfirmEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 3. Market Close Confirmation Modal */}
            <Dialog open={isMarketCloseModalOpen} onOpenChange={setIsMarketCloseModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Market Close</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to close the market for <span className="font-semibold">{selectedGame?.name}</span>? This may affect active bets.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="destructive" onClick={handleConfirmMarketClose}>Confirm & Close Market</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GameName;