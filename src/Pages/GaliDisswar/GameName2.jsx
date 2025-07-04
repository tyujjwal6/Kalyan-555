import React, { useState, useMemo } from 'react';
import { ArrowUpDown, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- Dummy Data ---
const gameListData = [
  { id: 1, gameName: 'STARLINE-14', gameNameHindi: 'STARLINE-14', openTime: '11:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 2, gameName: 'STARLINE-13', gameNameHindi: 'STARLINE-13', openTime: '10:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 3, gameName: 'STARLINE-12', gameNameHindi: 'STARLINE-12', openTime: '09:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 4, gameName: 'STARLINE-11', gameNameHindi: 'STARLINE-11', openTime: '08:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 5, gameName: 'STARLINE-10', gameNameHindi: 'STARLINE-10', openTime: '07:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 6, gameName: 'STARLINE-9', gameNameHindi: 'STARLINE-9', openTime: '06:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 7, gameName: 'STARLINE-8', gameNameHindi: 'STARLINE-8', openTime: '05:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 8, gameName: 'STARLINE-7', gameNameHindi: 'STARLINE-7', openTime: '04:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 9, gameName: 'STARLINE-6', gameNameHindi: 'STARLINE-6', openTime: '03:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 10, gameName: 'STARLINE-1', gameNameHindi: 'STARLINE-1', openTime: '10:00 AM', status: true, marketStatus: 'Market Open' },
  { id: 11, gameName: 'STARLINE-2', gameNameHindi: 'STARLINE-2', openTime: '11:00 AM', status: false, marketStatus: 'Market Close' },
  { id: 12, gameName: 'STARLINE-3', gameNameHindi: 'STARLINE-3', openTime: '12:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 13, gameName: 'STARLINE-4', gameNameHindi: 'STARLINE-4', openTime: '01:00 PM', status: true, marketStatus: 'Market Open' },
  { id: 14, gameName: 'STARLINE-5', gameNameHindi: 'STARLINE-5', openTime: '02:00 PM', status: true, marketStatus: 'Market Open' },
];

const GameName = () => {
  const [data, setData] = useState(gameListData);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '#', direction: 'ascending' });

  // --- NEW: State for modals ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMarketCloseModalOpen, setIsMarketCloseModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [newGameData, setNewGameData] = useState({ gameName: '', gameNameHindi: '', openTime: '' });

  // --- Modal Handlers ---
  const handleAddClick = () => {
    setNewGameData({ gameName: '', gameNameHindi: '', openTime: '' });
    setIsAddModalOpen(true);
  };
  
  const handleEditClick = (game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };
  
  const handleMarketCloseClick = (game) => {
    setSelectedGame(game);
    setIsMarketCloseModalOpen(true);
  };

  const handleConfirmAdd = () => {
    console.log("Adding game:", newGameData);
    // Add to the main data list with a new ID
    setData(prevData => [
      ...prevData,
      { id: Date.now(), ...newGameData, status: true, marketStatus: 'Market Open' }
    ]);
    setIsAddModalOpen(false);
  };
  
  const handleConfirmEdit = (updatedGame) => {
    console.log("Editing game:", updatedGame);
    setData(prevData => prevData.map(game => game.id === updatedGame.id ? updatedGame : game));
    setIsEditModalOpen(false);
    setSelectedGame(null);
  };

  const handleConfirmMarketClose = () => {
    console.log("Closing market for:", selectedGame);
    setData(prevData => prevData.map(game => 
      game.id === selectedGame.id ? { ...game, marketStatus: 'Market Close', status: false } : game
    ));
    setIsMarketCloseModalOpen(false);
    setSelectedGame(null);
  };
  
  // --- Data Processing (no changes needed here) ---
  const filteredData = useMemo(() => data.filter(item => item.gameName.toLowerCase().includes(searchTerm.toLowerCase())), [data, searchTerm]);
  const sortedData = useMemo(() => { let sortableItems = [...filteredData]; if (sortConfig.key) { sortableItems.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sortableItems; }, [filteredData, sortConfig]);
  const paginatedData = useMemo(() => { const startIndex = (currentPage - 1) * entriesToShow; return sortedData.slice(startIndex, startIndex + entriesToShow); }, [sortedData, currentPage, entriesToShow]);
  const totalPages = Math.ceil(filteredData.length / entriesToShow);
  const handleSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); };
  const SortableHeader = ({ children, columnKey }) => ( <TableHead onClick={() => handleSort(columnKey)} className="cursor-pointer hover:bg-muted/50"><div className="flex items-center gap-2">{children}<ArrowUpDown className="h-4 w-4" /></div></TableHead>);

  return (
    <>
      <Card>
        <CardHeader><CardTitle>Starline Game Name List</CardTitle></CardHeader>
        <CardContent>
          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select value={String(entriesToShow)} onValueChange={(value) => { setEntriesToShow(Number(value)); setCurrentPage(1); }}>
                <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem><SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="search">Search:</label>
                <Input id="search" type="text" className="w-full sm:w-[250px]" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
              </div>
              <Button onClick={handleAddClick} className="bg-blue-500 hover:bg-blue-600">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Game
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader columnKey="id">#</SortableHeader>
                  <SortableHeader columnKey="gameName">Game Name</SortableHeader>
                  <SortableHeader columnKey="gameNameHindi">Game Name Hindi</SortableHeader>
                  <SortableHeader columnKey="openTime">Open Time</SortableHeader>
                  <SortableHeader columnKey="status">Status</SortableHeader>
                  <SortableHeader columnKey="marketStatus">Market Status</SortableHeader>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.gameName}</TableCell>
                    <TableCell>{item.gameNameHindi}</TableCell>
                    <TableCell>{item.openTime}</TableCell>
                    <TableCell><Badge variant={item.status ? 'default' : 'destructive'} className={item.status ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}>{item.status ? 'Yes' : 'No'}</Badge></TableCell>
                    <TableCell><Badge variant={item.marketStatus === 'Market Open' ? 'default' : 'secondary'} className={item.marketStatus === 'Market Open' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800'}>{item.marketStatus}</Badge></TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => handleEditClick(item)}>Edit</Button>
                      <Button variant="secondary" size="sm" className="bg-green-600 text-white hover:bg-green-700" onClick={() => handleMarketCloseClick(item)} disabled={item.marketStatus === 'Market Close'}>Market Close</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-muted-foreground">Showing {Math.min((currentPage - 1) * entriesToShow + 1, filteredData.length)} to {Math.min(currentPage * entriesToShow, filteredData.length)} of {filteredData.length} entries</div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} /></PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(page => (<PaginationItem key={page}><PaginationLink href="#" isActive={page === currentPage} onClick={() => setCurrentPage(page)}>{page}</PaginationLink></PaginationItem>))}
                    <PaginationItem><PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} /></PaginationItem>
                </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      
      {/* --- MODALS SECTION --- */}
      {/* Add Game Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Game</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" value={newGameData.gameName} onChange={(e) => setNewGameData({...newGameData, gameName: e.target.value})} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name-hindi" className="text-right">Name (Hindi)</Label><Input id="name-hindi" value={newGameData.gameNameHindi} onChange={(e) => setNewGameData({...newGameData, gameNameHindi: e.target.value})} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="open-time" className="text-right">Open Time</Label><Input id="open-time" value={newGameData.openTime} onChange={(e) => setNewGameData({...newGameData, openTime: e.target.value})} className="col-span-3" placeholder="e.g. 10:00 PM"/></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmAdd}>Save Game</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Game Modal */}
      {selectedGame && <EditGameModal game={selectedGame} isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} onSave={handleConfirmEdit} />}

      {/* Market Close Confirmation Modal */}
      <Dialog open={isMarketCloseModalOpen} onOpenChange={setIsMarketCloseModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Market Close</DialogTitle><DialogDescription>Are you sure you want to close the market for <span className="font-semibold">{selectedGame?.gameName}</span>? This will also set its status to 'No'.</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmMarketClose}>Confirm & Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// --- NEW: Extracted Edit Modal into its own component for cleanliness ---
const EditGameModal = ({ game, isOpen, onOpenChange, onSave }) => {
  const [editedGame, setEditedGame] = useState(game);

  // Update local state if the selected game prop changes
  React.useEffect(() => {
    setEditedGame(game);
  }, [game]);

  const handleChange = (field, value) => {
    setEditedGame(prev => ({...prev, [field]: value}));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Game: {game.gameName}</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-name" className="text-right">Name</Label><Input id="edit-name" value={editedGame.gameName} onChange={(e) => handleChange('gameName', e.target.value)} className="col-span-3" /></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-name-hindi" className="text-right">Name (Hindi)</Label><Input id="edit-name-hindi" value={editedGame.gameNameHindi} onChange={(e) => handleChange('gameNameHindi', e.target.value)} className="col--span-3" /></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-open-time" className="text-right">Open Time</Label><Input id="edit-open-time" value={editedGame.openTime} onChange={(e) => handleChange('openTime', e.target.value)} className="col-span-3" /></div>
        </div>
        <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={() => onSave(editedGame)}>Save Changes</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameName;