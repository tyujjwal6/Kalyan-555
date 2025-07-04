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
import { ArrowUpDown } from 'lucide-react';

// A helper component to create sortable table headers with an icon.
const SortableHeader = ({ children }) => (
    <TableHead>
        <button className="flex items-center gap-1 font-semibold text-gray-700">
            {children}
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
        </button>
    </TableHead>
);

const ResultHistory = () => {
    // State for managing UI interactions
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    // --- NEW: State for the details modal ---
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null); // To store data of the clicked row

    // Mock data that matches the screenshot
    const gameHistory = [
        { id: 1, gameName: 'STARLINE-6', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 03:49:28 PM', number: '157-3' },
        { id: 2, gameName: 'STARLINE-5', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 02:33:30 PM', number: '179-7' },
        { id: 3, gameName: 'STARLINE-4', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:08:41 PM', number: '158-4' },
        { id: 4, gameName: 'STARLINE-3', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:06:50 PM', number: '560-1' },
        { id: 5, gameName: 'STARLINE-2', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 10:09:03 AM', number: '115-7' },
        { id: 6, gameName: 'STARLINE-1', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 09:01:14 AM', number: '110-2' },
        { id: 7, gameName: 'STARLINE-7', resultDate: '28 Jun 2025', declareDate: '28 Jun 2025 07:40:08 PM', number: '110-2' },
        { id: 8, gameName: 'STARLINE-6', resultDate: '28 Jun 2025', declareDate: '28 Jun 2025 05:50:56 PM', number: '179-7' },
        { id: 9, gameName: 'STARLINE-5', resultDate: '28 Jun 2025', declareDate: '28 Jun 2025 05:03:44 PM', number: '125-8' },
        { id: 10, gameName: 'STARLINE-4', resultDate: '28 Jun 2025', declareDate: '28 Jun 2025 03:22:19 PM', number: '228-2' },
    ];
    
    // --- MODAL AND API HANDLERS ---

    // NEW: Handles a row click to open the details modal
    const handleRowClick = (result) => {
        setSelectedResult(result);
        setIsDetailsModalOpen(true);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        console.log(`Dummy API Call: Searching for "${e.target.value}"`);
    };
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Dummy API Call: Fetching page ${page}`);
    };

    const handleEntriesChange = (value) => {
      console.log(`Dummy API Call: Setting entries per page to ${value}`);
    }

    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Game Result History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="show-entries" className="text-sm font-normal shrink-0">Show</Label>
                                <Select defaultValue="10" onValueChange={handleEntriesChange}>
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
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Label htmlFor="search-history" className="text-sm font-normal shrink-0">Search:</Label>
                                <Input id="search-history" className="w-full sm:w-auto" value={searchQuery} onChange={handleSearch} />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <SortableHeader>Game Name</SortableHeader>
                                        <SortableHeader>Result Date</SortableHeader>
                                        <TableHead>Declare Date</TableHead>
                                        <SortableHeader>Number</SortableHeader>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {gameHistory.map((game) => (
                                        // UPDATED: The TableRow is now a clickable button
                                        <TableRow 
                                          key={game.id}
                                          onClick={() => handleRowClick(game)}
                                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <TableCell>{game.id}</TableCell>
                                            <TableCell className="font-medium">{game.gameName}</TableCell>
                                            <TableCell>{game.resultDate}</TableCell>
                                            <TableCell>{game.declareDate}</TableCell>
                                            <TableCell className="font-semibold text-green-600">{game.number}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-600">
                                Showing 1 to 10 of 1,106 entries
                            </p>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                                {[1, 2, 3, 4, 5].map(page => (
                                    <Button
                                      key={page}
                                      size="sm"
                                      variant={currentPage === page ? 'default' : 'outline'}
                                      className={currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}
                                      onClick={() => handlePageChange(page)}
                                    >
                                      {page}
                                    </Button>
                                ))}
                                <span className="px-2">...</span>
                                <Button variant="outline" size="sm" onClick={() => handlePageChange(111)}>111</Button>
                                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- NEW: Result Details Modal --- */}
            <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Result Details</DialogTitle>
                  <DialogDescription>
                    Detailed information for {selectedResult?.gameName}.
                  </DialogDescription>
                </DialogHeader>
                {selectedResult && (
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-600">Game Name:</Label>
                      <span className="font-semibold">{selectedResult.gameName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-600">Result Date:</Label>
                      <span className="font-semibold">{selectedResult.resultDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-600">Declare Date:</Label>
                      <span className="font-semibold">{selectedResult.declareDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-600">Result Number:</Label>
                      <span className="font-bold text-lg text-green-600">{selectedResult.number}</span>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </>
    );
};

export default ResultHistory;