import React, { useState, useEffect, useMemo } from 'react';
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';

// Mock data generation (can be imported from a utils file)
const generateMockData = (count) => {
  const sampleGames = ['DELHI BAZAR', 'DESAWAR', 'FARIDABAD', 'SREE GANESH', 'GALI', 'GHAZIABAD'];
  const data = [];
  const baseDate = new Date('2025-06-29T12:00:00Z');
  for (let i = 1; i <= count; i++) {
    const resultDate = new Date(baseDate.getTime() - i * 10 * 3600 * 1000);
    const declareDate = new Date(resultDate.getTime() + Math.random() * 3600 * 1000);
    data.push({
      id: i,
      gameName: sampleGames[i % sampleGames.length],
      resultDate: resultDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
      declareDate: declareDate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(',', '').toUpperCase(),
      number: String(Math.floor(Math.random() * 100)).padStart(2, '0'),
    });
  }
  return data;
};

// We generate 500 entries as shown in the UI
const allResults = generateMockData(500);

const ResultHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Memoize filtered and sorted data to avoid re-calculation on every render
  const processedData = useMemo(() => {
    let filtered = [...allResults];

    // --- Search Logic ---
    if (searchTerm) {
        filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // --- Sorting Logic ---
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig]);

  // Effect to update table data when dependencies change
  useEffect(() => {
    const simulateApiCall = () => {
      setLoading(true);
      
      // Simulate API call with current parameters
      console.log('--- Simulating API Call ---');
      console.log('Fetching data with parameters:');
      console.log({
        page: currentPage,
        limit: entriesPerPage,
        search: searchTerm,
        sortBy: sortConfig.key,
        order: sortConfig.direction
      });

      // Simulate network delay
      setTimeout(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        setData(processedData.slice(startIndex, endIndex));
        setLoading(false);
      }, 300); // 300ms delay
    };
    
    simulateApiCall();

  }, [currentPage, entriesPerPage, processedData]);


  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const totalEntries = processedData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  return (
    <div className="bg-slate-50 min-h-screen w-full p-4 md:p-8">
      <Card className="w-full mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Game Result History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select value={String(entriesPerPage)} onValueChange={(value) => { setEntriesPerPage(Number(value)); setCurrentPage(1); }}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Entries" />
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
            <div className="flex items-center gap-2">
              <label htmlFor="search">Search:</label>
              <Input
                id="search"
                type="text"
                className="w-48 md:w-64"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[5%]">#</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('gameName')}>
                      Game Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Result Date</TableHead>
                  <TableHead>Declare Date</TableHead>
                  <TableHead className="text-right">
                     <Button variant="ghost" onClick={() => handleSort('number')}>
                      Number <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell className="font-medium">{item.gameName}</TableCell>
                      <TableCell>{item.resultDate}</TableCell>
                      <TableCell>{item.declareDate}</TableCell>
                      <TableCell className="text-right font-bold text-green-600 text-lg">{item.number}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
             <div className="text-sm text-muted-foreground">
                Showing {totalEntries > 0 ? startIndex + 1 : 0} to {endIndex} of {totalEntries} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if(currentPage > 1) setCurrentPage(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
                
                {/* Simplified Pagination Logic - shows first, last, and pages around current */}
                { totalPages > 0 && <PaginationItem> <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }} isActive={currentPage === 1}>1</PaginationLink> </PaginationItem> }
                { currentPage > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                { currentPage > 2 && <PaginationItem> <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage-1); }}>{currentPage-1}</PaginationLink> </PaginationItem>}
                { currentPage !== 1 && currentPage !== totalPages && <PaginationItem> <PaginationLink href="#" isActive>{currentPage}</PaginationLink> </PaginationItem>}
                { currentPage < totalPages - 1 && <PaginationItem> <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage+1); }}>{currentPage+1}</PaginationLink> </PaginationItem>}
                { currentPage < totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                { totalPages > 1 && <PaginationItem> <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }} isActive={currentPage === totalPages}>{totalPages}</PaginationLink> </PaginationItem> }

                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) setCurrentPage(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultHistory;