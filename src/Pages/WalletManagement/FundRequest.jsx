import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

/**
 * Dummy API function to simulate fetching fund requests from a backend.
 * @param {object} params - The query parameters for the API call.
 * @param {number} params.page - The current page number.
 * @param {number} params.limit - The number of entries per page.
 * @param {string} params.search - The search term.
 * @returns {Promise<object>} - A promise that resolves with the fetched data and total count.
 */
const fetchFundRequests = async (params) => {
  console.log("Holding selected data and hitting dummy API with params:", params);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // To match the UI, we return an empty dataset.
  // In a real application, you would filter and paginate data here.
  const allData = []; // This would be your full dataset from the backend
  const filteredData = allData.filter(item => 
    item.userName.toLowerCase().includes(params.search.toLowerCase())
  );
  
  const total = filteredData.length;
  const paginatedData = filteredData.slice(
    (params.page - 1) * params.limit,
    params.page * params.limit
  );

  console.log("Dummy API call successful!");
  return { data: paginatedData, total };
};


const FundRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const getFundRequests = async () => {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: parseInt(entriesToShow, 10),
        search: searchTerm,
      };
      const response = await fetchFundRequests(params);
      setData(response.data);
      setTotalEntries(response.total);
      setLoading(false);
    };

    getFundRequests();
  }, [currentPage, entriesToShow, searchTerm]);
  
  const totalPages = Math.ceil(totalEntries / parseInt(entriesToShow, 10)) || 1;
  const startEntry = totalEntries > 0 ? (currentPage - 1) * parseInt(entriesToShow, 10) + 1 : 0;
  const endEntry = Math.min(currentPage * parseInt(entriesToShow, 10), totalEntries);

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-full mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Fund Request List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Show</span>
              <Select value={entriesToShow} onValueChange={setEntriesToShow}>
                <SelectTrigger className="w-[80px]">
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
              <Label htmlFor="search" className="text-sm text-gray-700">Search:</Label>
              <Input
                id="search"
                type="text"
                className="w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  {[
                    "#", "User Name", "Amount", "Request No.", "Receipt Image",
                    "Date", "Status", "Action"
                  ].map((header, index) => (
                    <TableHead key={header} className="px-4 py-3 text-sm font-bold text-gray-600 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {header}
                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-48 text-center text-gray-500">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                      No data available in table
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => (
                    // This part will render rows when data is available
                    <TableRow key={item.id}>
                       <TableCell className="font-medium">{(currentPage - 1) * parseInt(entriesToShow) + index + 1}</TableCell>
                       <TableCell>{item.userName}</TableCell>
                       <TableCell>{item.amount}</TableCell>
                       <TableCell>{item.requestNo}</TableCell>
                       <TableCell>{item.receiptImage}</TableCell>
                       <TableCell>{item.date}</TableCell>
                       <TableCell>{item.status}</TableCell>
                       <TableCell>{/* Action buttons go here */}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm text-gray-700">
            <div>
              Showing {startEntry} to {endEntry} of {totalEntries} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundRequest;