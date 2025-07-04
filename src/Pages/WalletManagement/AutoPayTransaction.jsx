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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// --- NEW: Import Dialog components and cn utility ---
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
// Updated to include different statuses for demonstration
const initialData = [
  { id: 1, userName: 'Nagesh', amount: 500, requestNo: '8151426', txnId: 'SMTX250629174032368SOTGXB6MPDXJATDA', remark: '', date: '2025-06-29 17:40:37', status: 'Pending' },
  { id: 2, userName: 'Inayath Inayath', amount: 100, requestNo: '6441602', txnId: 'ICI18F094650lab4c75b2c17ba9926a78e9', remark: '', date: '2025-06-27 17:11:00', status: 'Accepted' },
  { id: 3, userName: 'Nagesh', amount: 500, requestNo: '2371701', txnId: 'AXI24aa816bc2c04593846b06a48367df08', remark: '', date: '2025-06-24 17:22:52', status: 'Pending' },
  { id: 4, userName: 'Bpn', amount: 500, requestNo: '8193987', txnId: 'PTM2524b20db3d44593a0e5d3d49982a18c', remark: '', date: '2025-06-23 21:06:00', status: 'Accepted' },
  { id: 5, userName: 'Ratansinh', amount: 300, requestNo: '6220724', txnId: 'YBL4c53da94b76a4cef9fb10762e64d3752', remark: '', date: '2025-06-23 13:42:57', status: 'Rejected' },
  { id: 6, userName: 'Shridhar. Joshi', amount: 300, requestNo: '5879136', txnId: 'AXL4a5d1b5fad6f481l82605c0b97dd2ece', remark: '', date: '2025-06-21 12:48:55', status: 'Pending' },
];

const generateFullData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % 6;
    data.push({
      ...initialData[baseIndex],
      id: i + 1,
      requestNo: (Math.random() * 10000000).toFixed(0).toString(),
    });
  }
  return data;
};

const fullData = generateFullData(323);

const AutopayTransaction = () => {
  const [data, setData] = useState(fullData);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '#', direction: 'ascending' });

  // --- NEW: State for modals ---
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionType, setActionType] = useState(''); // 'accept' or 'reject'
  
  // --- NEW: Modal Handlers ---
  const handleActionClick = (transaction, type) => {
    setSelectedTransaction(transaction);
    setActionType(type);
    setIsActionModalOpen(true);
  };
  
  const handleUserClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUserModalOpen(true);
  };
  
  const handleConfirmAction = () => {
    if (!selectedTransaction || !actionType) return;
    
    const newStatus = actionType.charAt(0).toUpperCase() + actionType.slice(1) + 'ed'; // Accept -> Accepted
    console.log(`Action: ${actionType} for transaction:`, selectedTransaction);
    
    // Update the state to reflect the change
    setData(prevData =>
      prevData.map(item =>
        item.id === selectedTransaction.id ? { ...item, status: newStatus } : item
      )
    );
    
    setIsActionModalOpen(false);
  };

  const filteredData = useMemo(() => data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [data, searchTerm]);
  const sortedData = useMemo(() => { let sortableItems = [...filteredData]; if (sortConfig.key) { sortableItems.sort((a, b) => { const valA = a[sortConfig.key]; const valB = b[sortConfig.key]; if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1; if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sortableItems; }, [filteredData, sortConfig]);
  const totalPages = Math.ceil(sortedData.length / entriesToShow);
  const paginatedData = sortedData.slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);
  const requestSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); };
  const getSortableHeader = (key, label) => ( <TableHead><Button variant="ghost" onClick={() => requestSort(key)} className="px-2 py-2">{label}<ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead> );

  return (
    <>
      <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
        <Card className="w-full max-w-full mx-auto">
          <CardHeader><CardTitle className="text-2xl font-bold">Fund Request Auto Deposit History</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2"><span>Show</span><Select value={entriesToShow.toString()} onValueChange={(value) => { setEntriesToShow(Number(value)); setCurrentPage(1); }}><SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entries</span></div>
              <div className="flex items-center gap-2"><label htmlFor="search">Search:</label><Input id="search" type="text" className="w-full sm:w-auto" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} /></div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {getSortableHeader('id', '#')}{getSortableHeader('userName', 'User Name')}{getSortableHeader('amount', 'Amount')}{getSortableHeader('requestNo', 'Request No.')}{getSortableHeader('txnId', 'Txn Id')}
                    {getSortableHeader('remark', 'Remark')}{getSortableHeader('date', 'Date')}{getSortableHeader('status', 'Status')}
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell><button onClick={() => handleUserClick(item)} className="text-blue-600 hover:underline">{item.userName}</button></TableCell>
                        <TableCell>₹{item.amount}</TableCell><TableCell>{item.requestNo}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.txnId}</TableCell><TableCell>{item.remark || ' '}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'Accepted' ? 'success' : item.status === 'Rejected' ? 'destructive' : 'secondary'}>{item.status}</Badge>
                        </TableCell>
                        <TableCell className="space-x-2 whitespace-nowrap">
                          {item.status === 'Pending' ? (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600 border-green-400 hover:bg-green-50 hover:text-green-700" onClick={() => handleActionClick(item, 'accept')}>Accept</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700" onClick={() => handleActionClick(item, 'reject')}>Reject</Button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">Completed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (<TableRow><TableCell colSpan={9} className="h-24 text-center">No results found.</TableCell></TableRow>)}
                </TableBody>
              </Table>
            </div>
            {/* Pagination Controls... */}
          </CardContent>
        </Card>
      </div>
      
      {/* --- MODALS SECTION --- */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
          <div className="py-4">User Name: <span className="font-semibold">{selectedTransaction?.userName}</span></div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>Are you sure you want to <span className={cn("font-bold", actionType === 'accept' ? 'text-green-600' : 'text-red-600')}>{actionType}</span> this transaction?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleConfirmAction} className={cn(actionType === 'accept' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700')}>{actionType === 'accept' ? 'Confirm Accept' : 'Confirm Reject'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutopayTransaction;