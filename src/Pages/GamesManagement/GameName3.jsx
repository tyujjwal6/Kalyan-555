import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

// --- DUMMY DATA ---
// Data to populate the table, with 22 entries as shown
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
  { id: 14, gameName: 'MILAN DAY', gameNameHindi: 'MILAN DAY', todayOpen: '03:00 PM', todayClose: '05:00 PM', active: true, marketStatus: 'Open Today' },
  { id: 15, gameName: 'KALYAN', gameNameHindi: 'KALYAN', todayOpen: '04:10 PM', todayClose: '06:10 PM', active: true, marketStatus: 'Open Today' },
  { id: 16, gameName: 'SRIDEVI DAY', gameNameHindi: 'SRIDEVI DAY', todayOpen: '11:35 AM', todayClose: '12:35 PM', active: true, marketStatus: 'Open Today' },
  { id: 17, gameName: 'MADHURI', gameNameHindi: 'MADHURI', todayOpen: '11:45 AM', todayClose: '12:45 PM', active: true, marketStatus: 'Open Today' },
  { id: 18, gameName: 'MADHURI NIGHT', gameNameHindi: 'MADHURI NIGHT', todayOpen: '08:45 PM', todayClose: '10:45 PM', active: true, marketStatus: 'Open Today' },
  { id: 19, gameName: 'MILAN NIGHT', gameNameHindi: 'MILAN NIGHT', todayOpen: '09:00 PM', todayClose: '11:10 PM', active: true, marketStatus: 'Open Today' },
  { id: 20, gameName: 'RAJDHANI NIGHT', gameNameHindi: 'RAJDHANI NIGHT', todayOpen: '09:25 PM', todayClose: '11:35 PM', active: true, marketStatus: 'Open Today' },
  { id: 21, gameName: 'SYNDICATE', gameNameHindi: 'SYNDICATE', todayOpen: '11:00 AM', todayClose: '12:00 PM', active: true, marketStatus: 'Open Today' },
  { id: 22, gameName: 'SYNDICATE NIGHT', gameNameHindi: 'SYNDICATE NIGHT', todayOpen: '07:30 PM', todayClose: '08:30 PM', active: true, marketStatus: 'Open Today' },
];

const GameName3 = () => {
  const [data, setData] = useState(initialGameData);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(2); // Set to 2 to match the image
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Dummy API call handlers for actions
  const handleAction = async (action, gameId, gameName) => {
    const payload = { gameId, action };
    console.log(`Performing action: ${action} for game: ${gameName} (ID: ${gameId})`, payload);
    alert(`Simulating action: '${action}' for game '${gameName}'`);
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (action === 'delete') {
      // In a real app, you would refetch data or remove from state upon success
      // setData(prevData => prevData.filter(item => item.id !== gameId));
      alert(`Game '${gameName}' would be deleted here.`);
    }
  };

  const handleAddGame = () => {
    alert("Navigating to 'Add Game' page.");
    // In a real app, this would likely navigate to a form page
    // e.g., navigate('/games/add');
  };

  // Memoized calculations for performance
  const filteredData = useMemo(() =>
    data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ), [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / entriesToShow);
  const paginatedData = sortedData.slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortableHeader = (key, label) => (
    <TableHead>
      <Button variant="ghost" onClick={() => requestSort(key)} className="px-2 py-2">
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Game Name List</h1>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddGame}>
                Add Game
            </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
                <label htmlFor="search">Search:</label>
                <Input id="search" type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
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
                  {paginatedData.length > 0 ? paginatedData.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.id}</TableCell>
                      <TableCell className="font-medium">{game.gameName}</TableCell>
                      <TableCell>{game.gameNameHindi}</TableCell>
                      <TableCell>{game.todayOpen}</TableCell>
                      <TableCell>{game.todayClose}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={game.active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                          {game.active ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={game.marketStatus === 'Open Today' ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-gray-100 text-gray-800 border-gray-200"}>
                          {game.marketStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-1 whitespace-nowrap">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleAction('edit', game.id, game.gameName)}>Edit</Button>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleAction('market_off', game.id, game.gameName)}>market off day</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAction('delete', game.id, game.gameName)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={8} className="h-24 text-center">No results found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {sortedData.length > 0 ? 1 + (currentPage - 1) * entriesToShow : 0} to {Math.min(currentPage * entriesToShow, sortedData.length)} of {sortedData.length} entries
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={currentPage === 1} /></PaginationItem>
                  {[...Array(totalPages).keys()].map(page => (
                     <PaginationItem key={page + 1}>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page + 1); }} isActive={currentPage === page + 1} className={currentPage === page + 1 ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : undefined}>
                           {page + 1}
                        </PaginationLink>
                     </PaginationItem>
                  ))}
                  <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={currentPage === totalPages} /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameName3;