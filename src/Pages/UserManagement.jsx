import React, { useState, useMemo } from 'react';
import { ArrowUpDown, MessageCircle, Phone, Eye } from 'lucide-react';

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

// --- DUMMY DATA ---
const initialData = [
  { id: 1, userName: 'Asif', mobile: '7737270676', email: 'temp@gmail.com', date: '29 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 2, userName: 'Roopanna Kambale', mobile: '9108638044', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 3, userName: 'Sanirun Bibi', mobile: '9394990663', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 4, userName: 'Vivek', mobile: '8602285936', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 5, userName: 'Suresh Verma', mobile: '8602722173', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 6, userName: 'Johan Tusu', mobile: '6207862438', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: false },
  { id: 7, userName: 'Rohit Kore', mobile: '9359365396', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 8, userName: 'Azid Ali', mobile: '7099111775', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 9, userName: 'Angrejya Saste', mobile: '9399319139', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 10, userName: 'Jagesh Ahirwar', mobile: '9098308900', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
];

// Helper to generate a full list of 1,033 entries for realistic pagination
const generateFullData = (count) => {
  const data = [];
  const userNames = ['Asif', 'Roopanna', 'Sanirun', 'Vivek', 'Suresh', 'Johan', 'Rohit', 'Azid', 'Angrejya', 'Jagesh'];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % 10;
    data.push({
      ...initialData[baseIndex],
      id: i + 1,
      userName: `${userNames[baseIndex]} ${i+1}`,
      mobile: (Math.random() * 10000000000).toFixed(0).toString().slice(0, 10),
    });
  }
  return data;
};

const fullData = generateFullData(1033);

const UserManagement = () => {
  const [data, setData] = useState(fullData);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Dummy API call handlers
  const handleViewUser = (userId) => {
    alert(`Viewing details for User ID: ${userId}.`);
    // In a real app, this would likely navigate to a user detail page
    // e.g., navigate(`/users/${userId}`);
  };
  
  const handleUnapprovedUsers = () => {
    alert("Navigating to Un-approved Users List.");
    // e.g., navigate('/users/unapproved');
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
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
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
  
  const getSortableHeader = (key, label, className = "") => (
    <TableHead className={className}>
      <Button variant="ghost" onClick={() => requestSort(key)} className="px-2 py-2">
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold">USER LIST</h1>
                <div className="text-sm text-gray-500">Dashboards / User List</div>
            </div>
            <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleUnapprovedUsers}
            >
                Un-approved Users List
            </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <Select
                  value={entriesToShow.toString()}
                  onValueChange={(value) => {
                    setEntriesToShow(Number(value));
                    setCurrentPage(1);
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
                    setCurrentPage(1);
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
                    {getSortableHeader('mobile', 'Mobile')}
                    {getSortableHeader('email', 'email')}
                    {getSortableHeader('date', 'Date')}
                    {getSortableHeader('balance', 'Balance')}
                    {getSortableHeader('betting', 'Betting')}
                    {getSortableHeader('transfer', 'Transfer')}
                    {getSortableHeader('active', 'Active')}
                    <TableHead>View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <a href="#" className="text-blue-600 hover:underline">{user.userName}</a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{user.mobile}</span>
                            <a href={`https://wa.me/${user.mobile}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white rounded-full p-1.5 inline-flex items-center justify-center hover:bg-green-600">
                                <MessageCircle size={14} />
                            </a>
                            <a href={`tel:${user.mobile}`} className="bg-blue-500 text-white rounded-full p-1.5 inline-flex items-center justify-center hover:bg-blue-600">
                                <Phone size={14} />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell>{user.balance}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.betting ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                            {user.betting ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className={user.transfer ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                            {user.transfer ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className={user.active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                            {user.active ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleViewUser(user.id)} className="text-blue-500 hover:text-blue-700">
                            <Eye size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
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
                          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page); }} isActive={currentPage === page} className={currentPage === page ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : undefined}>
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
    </div>
  );
};

export default UserManagement;