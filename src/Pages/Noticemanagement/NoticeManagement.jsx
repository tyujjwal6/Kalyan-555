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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from 'lucide-react';

const initialNotices = [
  {
    id: 1,
    title: 'TEST',
    content: 'TEST',
    date: '02 Oct 2023',
    status: 'Inactive',
  },
  {
    id: 2,
    title: 'Testing',
    content: 'hey! there users we are testing the app',
    date: '09 Nov 2022',
    status: 'Inactive',
  },
  // Add more mock data here to test pagination and search
  {
    id: 3,
    title: 'Maintenance',
    content: 'Scheduled maintenance this weekend.',
    date: '15 Sep 2023',
    status: 'Active',
  },
];

const NoticeManagement = () => {
  const [data, setData] = useState(initialNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized calculations for filtering, sorting, and pagination
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
  };
  
  const handleActivate = async (noticeId) => {
    console.log(`Activating notice with ID: ${noticeId}`);
    // Here you would typically show a loading state on the button
    
    // Format the data for your backend API
    const payload = {
      noticeId: noticeId,
      newStatus: 'Active', // The intended new status
      activatedBy: 'admin_user', // Example of extra data you might send
      timestamp: new Date().toISOString(),
    };

    try {
      // Hit a dummy API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const responseData = await response.json();
      console.log('Dummy API Response:', responseData);
      
      // On success, update the local state to reflect the change
      setData(prevData => 
        prevData.map(notice => 
          notice.id === noticeId ? { ...notice, status: 'Active' } : notice
        )
      );
      alert(`Notice ${noticeId} activated successfully!`);

    } catch (error) {
      console.error("Failed to activate notice:", error);
      alert(`Failed to activate notice ${noticeId}.`);
    }
  };

  const handleEdit = (noticeId) => {
      // In a real app, this would open a modal or navigate to an edit page
      console.log(`Editing notice with ID: ${noticeId}`);
      alert(`Edit functionality for notice ${noticeId} would be here.`);
  };

  const handleAddNotice = () => {
      // In a real app, this would open a modal or navigate to a new page
      console.log("Add Notice button clicked");
      alert("This would open a form to add a new notice.");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">Notice Management</CardTitle>
          <Button onClick={handleAddNotice} className="bg-blue-600 hover:bg-blue-700">
            Add Notice
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Show</span>
              <Select defaultValue="10" onValueChange={(value) => setEntriesPerPage(Number(value))}>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
                    <div className="flex items-center gap-2">Notice Title <ArrowUpDown className="h-4 w-4" /></div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('content')} className="cursor-pointer">
                    <div className="flex items-center gap-2">Content <ArrowUpDown className="h-4 w-4" /></div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                    <div className="flex items-center gap-2">Notice Date <ArrowUpDown className="h-4 w-4" /></div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                    <div className="flex items-center gap-2">Status <ArrowUpDown className="h-4 w-4" /></div>
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((notice, index) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">
                      {(currentPage - 1) * entriesPerPage + index + 1}
                    </TableCell>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell>{notice.content}</TableCell>
                    <TableCell>{notice.date}</TableCell>
                    <TableCell>
                      <Badge className={notice.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-600 hover:bg-pink-700 text-white'}>
                        {notice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 h-8" onClick={() => handleEdit(notice.id)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 h-8" onClick={() => handleActivate(notice.id)}>
                          Activate
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(totalPages).keys()].map(num => (
              <Button
                key={num}
                variant={currentPage === num + 1 ? "default" : "outline"}
                size="sm"
                className={`w-9 h-9 ${currentPage === num + 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoticeManagement;