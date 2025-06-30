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
import { ArrowUpDown } from 'lucide-react';

// To test with data, you can uncomment this and set the initial state to mockData.
/*
const mockData = [
  { id: 1, name: 'John Doe', mobile: '123-456-7890', email: 'john@example.com', query: 'How to reset password?', date: '15 Oct 2023' },
  { id: 2, name: 'Jane Smith', mobile: '987-654-3210', email: 'jane@example.com', query: 'Issue with payment.', date: '14 Oct 2023' },
  { id: 3, name: 'Peter Jones', mobile: '555-555-5555', email: 'peter@example.com', query: 'Inquiry about new features.', date: '12 Oct 2023' },
];
*/

/**
 * UserQuery Component
 * 
 * Displays a list of user queries in a sortable, searchable, and paginated table.
 * The component is designed to be easily integrated with a backend API for fetching data.
 */
const UserQuery = () => {
  // Initial state is an empty array to exactly match the screenshot
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // NOTE: The code is structured to easily integrate a fetch call from a real API.
  // You would typically use a `useEffect` hook here to fetch data and populate the `data` state.
  // For example:
  // useEffect(() => {
  //   fetch('your-api-endpoint/queries')
  //     .then(res => res.json())
  //     .then(apiData => setData(apiData));
  // }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
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
    const startIndex = (currentPage - 1) * entriesPerPage;
    return sortedData.slice(startIndex, startIndex + entriesPerPage);
  }, [sortedData, currentPage, entriesPerPage]);

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };
  
  const headers = [
    { key: 'name', label: 'User Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'email', label: 'Email' },
    { key: 'query', label: 'Query' },
    { key: 'date', label: 'Date' },
  ];

  const startEntry = sortedData.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, sortedData.length);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <Card className="shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Users Query List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Show</span>
              <Select defaultValue="10" onValueChange={(value) => { setEntriesPerPage(Number(value)); setCurrentPage(1); }}>
                <SelectTrigger className="w-20 h-9">
                  <SelectValue placeholder="10" />
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
              <label htmlFor="search" className="text-sm text-gray-700">Search:</label>
              <Input
                id="search"
                type="text"
                className="w-full sm:w-64 h-9"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-gray-50 hover:bg-gray-100/50">
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  {headers.map((header) => (
                    <TableHead key={header.key} onClick={() => handleSort(header.key)} className="cursor-pointer">
                      <div className="flex items-center gap-2">{header.label} <ArrowUpDown className="h-4 w-4" /></div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.mobile}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.query}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length + 1} className="h-24 text-center text-gray-500">
                      No data available in table
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
           <div className="text-sm text-gray-600">
            Showing {startEntry} to {endEntry} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || totalPages === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserQuery;