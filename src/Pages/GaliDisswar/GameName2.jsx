import React, { useState, useMemo } from 'react';
import { ArrowUpDown, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

// --- Dummy Data ---
// In a real application, this would come from a backend API.
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

  // --- Dummy API Handlers ---
  const handleAction = (action, game) => {
    console.log(`Action: ${action}`, game);
    alert(`Dummy API Call: ${action} for game ID ${game.id}`);
    // Example backend integration:
    // fetch(`/api/games/${game.id}/${action}`, { method: 'POST' })
    //   .then(res => res.json())
    //   .then(updatedData => setData(updatedData));
  };

  const handleAddGame = () => {
    console.log("Action: Add Game");
    alert("Dummy action: Opening 'Add Game' modal...");
  };

  // --- Data Processing ---
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gameNameHindi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesToShow;
    return sortedData.slice(startIndex, startIndex + entriesToShow);
  }, [sortedData, currentPage, entriesToShow]);

  const totalPages = Math.ceil(filteredData.length / entriesToShow);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // --- Reusable Sortable Header Component ---
  const SortableHeader = ({ children, columnKey }) => (
    <TableHead onClick={() => handleSort(columnKey)} className="cursor-pointer hover:bg-muted/50">
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Starline Game Name List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select value={String(entriesToShow)} onValueChange={(value) => setEntriesToShow(Number(value))}>
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="search">Search:</label>
              <Input
                id="search"
                type="text"
                className="w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddGame} className="bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Game
            </Button>
          </div>
        </div>

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
              {paginatedData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.gameName}</TableCell>
                  <TableCell>{item.gameNameHindi}</TableCell>
                  <TableCell>{item.openTime}</TableCell>
                  <TableCell>
                    <Badge variant={item.status ? 'default' : 'destructive'} className={item.status ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}>
                      {item.status ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.marketStatus === 'Market Open' ? 'default' : 'secondary'} className={item.marketStatus === 'Market Open' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800'}>
                      {item.marketStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => handleAction('Edit', item)}>Edit</Button>
                    <Button variant="secondary" size="sm" className="bg-green-600 text-white hover:bg-green-700" onClick={() => handleAction('Market Close', item)}>Market Close</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-muted-foreground">
                Showing {Math.min((currentPage - 1) * entriesToShow + 1, filteredData.length)} to {Math.min(currentPage * entriesToShow, filteredData.length)} of {filteredData.length} entries
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink href="#" isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameName;