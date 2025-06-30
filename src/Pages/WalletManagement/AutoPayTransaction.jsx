import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
// The exact path might differ based on your project's configuration
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

// --- DUMMY DATA ---
// A sample of the data shown in the image
const initialData = [
  { id: 1, userName: 'Nagesh', amount: 500, requestNo: '8151426', txnId: 'SMTX250629174032368SOTGXB6MPDXJATDA', remark: '', date: '2025-06-29 17:40:37', status: 'Accepted' },
  { id: 2, userName: 'Inayath Inayath', amount: 100, requestNo: '6441602', txnId: 'ICI18F094650lab4c75b2c17ba9926a78e9', remark: '', date: '2025-06-27 17:11:00', status: 'Accepted' },
  { id: 3, userName: 'Nagesh', amount: 500, requestNo: '2371701', txnId: 'AXI24aa816bc2c04593846b06a48367df08', remark: '', date: '2025-06-24 17:22:52', status: 'Accepted' },
  { id: 4, userName: 'Bpn', amount: 500, requestNo: '8193987', txnId: 'PTM2524b20db3d44593a0e5d3d49982a18c', remark: '', date: '2025-06-23 21:06:00', status: 'Accepted' },
  { id: 5, userName: 'Ratansinh', amount: 300, requestNo: '6220724', txnId: 'YBL4c53da94b76a4cef9fb10762e64d3752', remark: '', date: '2025-06-23 13:42:57', status: 'Accepted' },
  { id: 6, userName: 'Shridhar. Joshi', amount: 300, requestNo: '5879136', txnId: 'AXL4a5d1b5fad6f481l82605c0b97dd2ece', remark: '', date: '2025-06-21 12:48:55', status: 'Accepted' },
  { id: 7, userName: 'Ratansinh', amount: 300, requestNo: '4132191', txnId: 'AXLa5f8c0c690f046be8fe72b47f4d68a09', remark: '', date: '2025-06-20 20:35:06', status: 'Accepted' },
  { id: 8, userName: 'Rahul Yadav', amount: 200, requestNo: '7383496', txnId: 'HDFB4ef7dc6f4a14d2aa60567b48cde94c5', remark: '', date: '2025-06-20 12:19:47', status: 'Accepted' },
  { id: 9, userName: 'Rituraj Singhal', amount: 100, requestNo: '9156547', txnId: 'SBIIifd4228739ad4d7ba387f5e6279986bf', remark: '', date: '2025-06-19 16:07:15', status: 'Accepted' },
  { id: 10, userName: 'Rituraj Singhal', amount: 250, requestNo: '5904060', txnId: 'SBII0bc73c3e35f4076bd1fa6b3595f0128', remark: '', date: '2025-06-19 14:47:14', status: 'Accepted' },
];

// Helper to generate a full list of 323 entries for realistic pagination
const generateFullData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % 10;
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
  
  // Dummy API call handler for Accept/Reject actions
  const handleAction = async (transactionId, action) => {
    // Prepare the data to be sent to the backend
    const payload = {
      transactionId,
      status: action.toUpperCase(), // e.g., 'ACCEPTED' or 'REJECTED'
    };
    
    console.log('Sending data to dummy API:', payload);
    
    // Simulate an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5s network delay
      
      // On success, show a confirmation. In a real app, you might update the UI.
      alert(`Transaction ID ${transactionId} has been successfully ${action}.`);
      
      // Example of updating UI: disable buttons for the processed row
      // setData(prevData => prevData.map(item =>
      //   item.id === transactionId ? { ...item, status: action } : item
      // ));
      
    } catch (error) {
      console.error('Dummy API call failed:', error);
      alert('An error occurred. Please check the console.');
    }
  };

  // Memoized calculations for filtering, sorting, and pagination
  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
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
      <Card className="w-full max-w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Fund Request Auto Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select
                value={entriesToShow.toString()}
                onValueChange={(value) => {
                  setEntriesToShow(Number(value));
                  setCurrentPage(1); // Reset to first page
                }}
              >
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
            <div className="flex items-center gap-2">
              <label htmlFor="search">Search:</label>
              <Input
                id="search"
                type="text"
                className="w-full sm:w-auto"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {getSortableHeader('id', '#')}
                  {getSortableHeader('userName', 'User Name')}
                  {getSortableHeader('amount', 'Amount')}
                  {getSortableHeader('requestNo', 'Request No.')}
                  {getSortableHeader('txnId', 'Txn Id')}
                  {getSortableHeader('remark', 'Remark')}
                  {getSortableHeader('date', 'Date')}
                  {getSortableHeader('status', 'Status')}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <a href="#" className="text-blue-600 hover:underline">{item.userName}</a>
                      </TableCell>
                      <TableCell>₹{item.amount}</TableCell>
                      <TableCell>{item.requestNo}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.txnId}</TableCell>
                      <TableCell>{item.remark || ' '}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
                          Accepted
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                          onClick={() => handleAction(item.id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleAction(item.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {Math.min(1 + (currentPage - 1) * entriesToShow, sortedData.length)} to {Math.min(currentPage * entriesToShow, sortedData.length)} of {sortedData.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={currentPage === 1} />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page); }} isActive={currentPage === page}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {totalPages > 5 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {totalPages > 5 && (
                    <PaginationItem>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }} isActive={currentPage === totalPages}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={currentPage === totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutopayTransaction;