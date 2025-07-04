import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Eye } from 'lucide-react';
// --- NEW: Import Dialog components ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- UPDATED: Using mock data to demonstrate functionality ---
const mockData = [
  { id: 1, name: 'John Doe', mobile: '123-456-7890', email: 'john@example.com', query: 'How to reset my password? I have tried the "Forgot Password" link but I am not receiving the email. Please assist.', date: '15 Oct 2023' },
  { id: 2, name: 'Jane Smith', mobile: '987-654-3210', email: 'jane@example.com', query: 'There seems to be an issue with my last payment. It was deducted from my account but not reflected in my wallet balance.', date: '14 Oct 2023' },
  { id: 3, name: 'Peter Jones', mobile: '555-555-5555', email: 'peter@example.com', query: 'I have an inquiry about the new features announced last week. Could you provide more details on the "Super Bet" option?', date: '12 Oct 2023' },
  { id: 4, name: 'Sam Wilson', mobile: '111-222-3333', email: 'sam@example.com', query: 'My account was unexpectedly locked. Can you please look into it?', date: '11 Oct 2023' },
];

const UserQuery = () => {
  const [data, setData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- NEW: State for modals ---
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // --- NEW: Modal handlers ---
  const handleViewClick = (query) => {
    setSelectedQuery(query);
    setIsViewModalOpen(true);
  };
  
  const handleDeleteClick = (query) => {
    setSelectedQuery(query);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (!selectedQuery) return;
    setData(prevData => prevData.filter(item => item.id !== selectedQuery.id));
    setIsDeleteModalOpen(false);
  };

  const filteredData = useMemo(() => data.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [data, searchTerm]);
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => { const startIndex = (currentPage - 1) * entriesPerPage; return sortedData.slice(startIndex, startIndex + entriesPerPage); }, [sortedData, currentPage, entriesPerPage]);
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const handleSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); setCurrentPage(1); };
  
  const headers = [
    { key: 'name', label: 'User Name' }, { key: 'mobile', label: 'Mobile' },
    { key: 'email', label: 'Email' }, { key: 'query', label: 'Query' }, { key: 'date', label: 'Date' }
  ];

  const startEntry = sortedData.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, sortedData.length);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
        <Card className="shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Users Query List</CardTitle>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Controls stack on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 w-full sm:w-auto">
                <span>Show</span>
                <Select defaultValue="10" onValueChange={(value) => { setEntriesPerPage(Number(value)); setCurrentPage(1); }}>
                  <SelectTrigger className="w-20 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label htmlFor="search" className="text-sm text-gray-700 shrink-0">Search:</label>
                <Input id="search" type="text" className="w-full sm:w-64 h-9" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
              </div>
            </div>
            
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    {headers.map((header) => (
                      <TableHead key={header.key} onClick={() => handleSort(header.key)} className="cursor-pointer">
                        <div className="flex items-center gap-2">{header.label} <ArrowUpDown className="h-4 w-4" /></div>
                      </TableHead>
                    ))}
                    {/* NEW: Action column header */}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell><TableCell>{item.mobile}</TableCell><TableCell>{item.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.query}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        {/* NEW: Action buttons */}
                        <TableCell className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleViewClick(item)}><Eye className="h-5 w-5" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={headers.length + 2} className="h-24 text-center text-gray-500">No data available in table</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          {/* RESPONSIVE: Footer stacks on mobile */}
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="text-sm text-gray-600">Showing {startEntry} to {endEntry} of {sortedData.length} entries</div>
            {/* Pagination controls */}
          </CardFooter>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Query Details</DialogTitle></DialogHeader>
          <div className="py-4 space-y-3">
            <div className="flex justify-between"><span>User:</span><span className="font-semibold">{selectedQuery?.name}</span></div>
            <div className="flex justify-between"><span>Mobile:</span><span className="font-semibold">{selectedQuery?.mobile}</span></div>
            <div className="flex justify-between"><span>Email:</span><span className="font-semibold">{selectedQuery?.email}</span></div>
            <div className="flex justify-between"><span>Date:</span><span className="font-semibold">{selectedQuery?.date}</span></div>
            <div><span className="font-semibold">Query:</span><p className="mt-1 p-2 bg-gray-100 rounded-md text-sm">{selectedQuery?.query}</p></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Are you sure you want to delete this query? This action cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserQuery;