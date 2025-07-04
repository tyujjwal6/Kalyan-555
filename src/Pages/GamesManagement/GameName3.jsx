import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";


// --- DUMMY DATA ---
const initialGameData = [
  { id: 1, gameName: 'MILAN MORNING', gameNameHindi: 'MILAN MORNING', todayOpen: '10:10 AM', todayClose: '11:10 AM', active: true, marketStatus: 'Open Today' },
  { id: 2, gameName: 'KALYAN MORNING', gameNameHindi: 'KALYAN MORNING', todayOpen: '10:55 AM', todayClose: '11:55 AM', active: true, marketStatus: 'Open Today' },
  { id: 3, gameName: 'MADHUR MORNING', gameNameHindi: 'MADHUR MORNING', todayOpen: '11:25 AM', todayClose: '12:25 PM', active: true, marketStatus: 'Open Today' },
  { id: 4, gameName: 'SRIDEVI', gameNameHindi: 'SRIDEVI', todayOpen: '11:30 AM', todayClose: '12:30 PM', active: true, marketStatus: 'Open Today' },
  { id: 5, gameName: 'MADHUR DAY', gameNameHindi: 'MADHUR DAY', todayOpen: '01:25 PM', todayClose: '02:25 PM', active: true, marketStatus: 'Open Today' },
  { id: 6, gameName: 'RAJDHANI DAY', gameNameHindi: 'RAJDHANI DAY', todayOpen: '02:55 PM', todayClose: '05:10 PM', active: true, marketStatus: 'Open Today' },
  { id: 7, gameName: 'SUPERME DAY', gameNameHindi: 'SUPERME DAY', todayOpen: '03:30 PM', todayClose: '05:30 PM', active: true, marketStatus: 'Open Today' },
  { id: 8, gameName: 'SRIDEVI NIGHT', gameNameHindi: 'SRIDEVI NIGHT', todayOpen: '06:55 PM', todayClose: '07:55 PM', active: true, marketStatus: 'Open Today' },
  { id: 9, gameName: 'MADHUR NIGHT', gameNameHindi: 'MADHUR NIGHT', todayOpen: '08:25 PM', todayClose: '10:25 PM', active: true, marketStatus: 'Open Today' },
  { id: 10, gameName: 'SUPERME NIGHT', gameNameHindi: 'SUPERME NIGHT', todayOpen: '08:30 PM', todayClose: '10:30 PM', active: true, marketStatus: 'Open Today' },
  { id: 11, gameName: 'KALYAN NIGHT', gameNameHindi: 'KALYAN NIGHT', todayOpen: '09:00 PM', todayClose: '11:00 PM', active: true, marketStatus: 'Open Today' },
  { id: 12, gameName: 'MAIN BAZAR', gameNameHindi: 'MAIN BAZAR', todayOpen: '09:30 PM', todayClose: '11:55 PM', active: true, marketStatus: 'Open Today' },
  { id: 13, gameName: 'TIME BAZAR', gameNameHindi: 'TIME BAZAR', todayOpen: '01:00 PM', todayClose: '02:00 PM', active: false, marketStatus: 'Closed' },
];

const GameName3 = () => {
  const [data, setData] = useState(initialGameData);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMarketOffModalOpen, setIsMarketOffModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  
  // Modal Handlers
  const handleAddClick = () => setIsAddModalOpen(true);
  const handleEditClick = (game) => { setSelectedGame(game); setIsEditModalOpen(true); };
  const handleMarketOffClick = (game) => { setSelectedGame(game); setIsMarketOffModalOpen(true); };
  const handleDeleteClick = (game) => { setSelectedGame(game); setIsDeleteModalOpen(true); };
  
  const handleConfirmAdd = (newGame) => { setData(prev => [...prev, { ...newGame, id: Date.now(), active: true, marketStatus: 'Open Today' }]); setIsAddModalOpen(false); };
  const handleConfirmEdit = (updatedGame) => { setData(prev => prev.map(game => game.id === updatedGame.id ? updatedGame : game)); setIsEditModalOpen(false); };
  const handleConfirmMarketOff = () => { setData(prev => prev.map(game => game.id === selectedGame.id ? { ...game, marketStatus: 'Closed', active: false } : game)); setIsMarketOffModalOpen(false); };
  const handleConfirmDelete = () => { setData(prev => prev.filter(game => game.id !== selectedGame.id)); setIsDeleteModalOpen(false); };

  // Data processing memoized for performance
  const filteredData = useMemo(() => data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [data, searchTerm]);
  const sortedData = useMemo(() => { let sortableItems = [...filteredData]; if (sortConfig.key) { sortableItems.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sortableItems; }, [filteredData, sortConfig]);
  const totalPages = Math.ceil(sortedData.length / entriesToShow);
  const paginatedData = sortedData.slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);
  const requestSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); };
  const getSortableHeader = (key, label) => ( <TableHead><Button variant="ghost" onClick={() => requestSort(key)} className="px-2 py-2">{label}<ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead> );

  return (
    <>
      <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* RESPONSIVE: Stacks vertically on mobile, horizontally on small screens and up */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Game Name List</h1>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto" onClick={handleAddClick}>Add Game</Button>
          </div>
          <Card>
            <CardContent className="p-4 sm:p-6">
              {/* RESPONSIVE: Stacks controls on mobile */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span>Show</span>
                  <Select value={entriesToShow.toString()} onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>entries</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Label htmlFor="search" className="shrink-0">Search:</Label>
                  <Input id="search" type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full sm:w-auto"/>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {getSortableHeader('id', '#')}
                      {getSortableHeader('gameName', 'Game Name')}
                      {getSortableHeader('gameNameHindi', 'Game Name Hindi')}
                      {getSortableHeader('todayOpen', 'Today Open')}
                      {getSortableHeader('todayClose', 'Today Close')}
                      {getSortableHeader('active', 'Active')}
                      {getSortableHeader('marketStatus', 'Market Status')}
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell>{game.id}</TableCell><TableCell className="font-medium">{game.gameName}</TableCell><TableCell>{game.gameNameHindi}</TableCell>
                        <TableCell>{game.todayOpen}</TableCell><TableCell>{game.todayClose}</TableCell>
                        <TableCell><Badge variant="outline" className={cn("text-xs", game.active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200")}>{game.active ? 'Yes' : 'No'}</Badge></TableCell>
                        <TableCell><Badge variant="outline" className={cn("text-xs", game.marketStatus === 'Open Today' ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-gray-100 text-gray-800 border-gray-200")}>{game.marketStatus}</Badge></TableCell>
                        <TableCell className="space-x-1 whitespace-nowrap">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleEditClick(game)}>Edit</Button>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleMarketOffClick(game)} disabled={!game.active}>market off day</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(game)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* RESPONSIVE: Stacks on mobile, horizontal on small screens and up */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <div className="text-sm text-muted-foreground">Showing {sortedData.length > 0 ? 1 + (currentPage - 1) * entriesToShow : 0} to {Math.min(currentPage * entriesToShow, sortedData.length)} of {sortedData.length} entries</div>
                <Pagination>
                  {/* Pagination content remains the same, it's fairly responsive by default */}
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modals Section */}
      {isAddModalOpen && <GameFormModal mode="add" isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleConfirmAdd} />}
      {isEditModalOpen && selectedGame && <GameFormModal mode="edit" game={selectedGame} isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} onSave={handleConfirmEdit} />}
      <Dialog open={isMarketOffModalOpen} onOpenChange={setIsMarketOffModalOpen}><DialogContent><DialogHeader><DialogTitle>Confirm Action</DialogTitle><DialogDescription>Are you sure you want to mark <span className="font-semibold">{selectedGame?.gameName}</span> as 'Closed' for today?</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmMarketOff}>Confirm</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}><DialogContent><DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Are you sure you want to delete <span className="font-semibold">{selectedGame?.gameName}</span>? This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button></DialogFooter></DialogContent></Dialog>
    </>
  );
};

// --- RESPONSIVE: Updated GameFormModal for better mobile view ---
const GameFormModal = ({ mode, game, isOpen, onOpenChange, onSave }) => {
    const [formData, setFormData] = useState(mode === 'edit' ? game : { gameName: '', gameNameHindi: '', todayOpen: '', todayClose: '' });
    
    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value }));
    };

    const handleSave = () => { onSave(formData); };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader><DialogTitle>{mode === 'edit' ? 'Edit Game' : 'Add New Game'}</DialogTitle></DialogHeader>
                {/* RESPONSIVE: Changed from grid to a simpler, stacking layout */}
                <div className="space-y-4 py-4">
                    <div className="space-y-2"><Label htmlFor="gameName">Game Name</Label><Input id="gameName" value={formData.gameName} onChange={(e) => handleChange('gameName', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="gameNameHindi">Name (Hindi)</Label><Input id="gameNameHindi" value={formData.gameNameHindi} onChange={(e) => handleChange('gameNameHindi', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="todayOpen">Open Time</Label><Input id="todayOpen" value={formData.todayOpen} onChange={(e) => handleChange('todayOpen', e.target.value)} placeholder="e.g., 10:00 AM" /></div>
                    <div className="space-y-2"><Label htmlFor="todayClose">Close Time</Label><Input id="todayClose" value={formData.todayClose} onChange={(e) => handleChange('todayClose', e.target.value)} placeholder="e.g., 11:00 AM" /></div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GameName3;