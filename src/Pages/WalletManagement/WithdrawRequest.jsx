import React from 'react';
import { ArrowUpDown, ExternalLink, Eye } from 'lucide-react';

// Import shadcn/ui components
// Make sure you have these components installed and configured in your project
// e.g., npx shadcn-ui@latest add card button table badge select input pagination
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dummy data mirroring the image. This can be replaced by an API call.
const withdrawRequestsData = [
  { id: 1, userName: "Deepak Lot", mobile: "9926552931", amount: 1000, requestNo: "2160024", date: "28 Jun 2025 08:16:33 AM", status: "Pending" },
  { id: 2, userName: "Deepak Lot", mobile: "9926552931", amount: 5009, requestNo: "7322462", date: "26 Jun 2025 08:20:19 AM", status: "Rejected" },
  { id: 3, userName: "Bhimanna", mobile: "9663981393", amount: 1000, requestNo: "9797934", date: "25 Jun 2025 07:14:43 AM", status: "Rejected" },
  { id: 4, userName: "Mehul Mistry", mobile: "9537104413", amount: 1000, requestNo: "8347449", date: "25 Jun 2025 07:02:15 AM", status: "Rejected" },
  { id: 5, userName: "Bhimanna", mobile: "9663981393", amount: 1700, requestNo: "2124976", date: "24 Jun 2025 08:49:54 AM", status: "Rejected" },
  { id: 6, userName: "Deepak Lot", mobile: "9926552931", amount: 5009, requestNo: "3938685", date: "24 Jun 2025 08:19:31 AM", status: "Rejected" },
  { id: 7, userName: "Mehul Mistry", mobile: "9537104413", amount: 1000, requestNo: "6530656", date: "24 Jun 2025 07:00:41 AM", status: "Rejected" },
  { id: 8, userName: "Rahul Yadav", mobile: "9455978202", amount: 4000, requestNo: "2446773", date: "21 Jun 2025 08:58:34 AM", status: "Rejected" },
  { id: 9, userName: "Deepak Lot", mobile: "9926552931", amount: 1500, requestNo: "2646026", date: "21 Jun 2025 07:05:42 AM", status: "Rejected" },
  { id: 10, userName: "Deepak Lot", mobile: "9926552931", amount: 3500, requestNo: "4048002", date: "20 Jun 2025 07:09:03 AM", status: "Rejected" },
];

const WithdrawRequest = () => {

  // Dummy handler for simulating API calls
  const handleAction = (actionType, request) => {
    console.log(`Hitting dummy API for action: ${actionType}`);
    console.log('Selected Data:', request);
    
    // In a real application, you would make an API call like this:
    /*
    const apiEndpoint = `https://api.example.com/withdraw-requests/${request.id}/action`;
    
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN'
      },
      body: JSON.stringify({ 
        action: actionType,
        ...request // sending the whole request data
      })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert(`Action "${actionType}" was successful!`);
      // Here you might want to refresh the data list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(`Action "${actionType}" failed.`);
    });
    */

    // For demonstration purposes, we'll just show an alert.
    alert(`Action: ${actionType}\nUser: ${request.userName}\nAmount: ${request.amount}\nRequest No: ${request.requestNo}`);
  };

  // Helper component for table headers to keep code clean
  const TableHeaderItem = ({ children }) => (
    <TableHead>
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="font-semibold text-black">{children}</span>
        <ArrowUpDown className="h-4 w-4 text-gray-400" />
      </div>
    </TableHead>
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle>Withdraw Request List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Show</span>
              <Select defaultValue="10">
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
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Search:</span>
              <Input type="search" className="w-auto sm:w-[250px]" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHeaderItem>#</TableHeaderItem>
                  <TableHeaderItem>User Name</TableHeaderItem>
                  <TableHeaderItem>Mobile</TableHeaderItem>
                  <TableHeaderItem>Amount</TableHeaderItem>
                  <TableHeaderItem>Request No.</TableHeaderItem>
                  <TableHeaderItem>Date</TableHeaderItem>
                  <TableHeaderItem>Status</TableHeaderItem>
                  <TableHeaderItem>View</TableHeaderItem>
                  <TableHeaderItem>Action</TableHeaderItem>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawRequestsData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                        {request.userName}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell>{request.mobile}</TableCell>
                    <TableCell>{request.amount}</TableCell>
                    <TableCell>{request.requestNo}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Badge className={
                        request.status === 'Pending' 
                        ? 'bg-sky-100 text-sky-800 hover:bg-sky-100 font-medium'
                        : 'bg-red-100 text-red-800 hover:bg-red-100 font-medium'
                      }>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction('view', request)}>
                        <Eye className="h-5 w-5 text-blue-600" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-7 rounded-md"
                          onClick={() => handleAction('approve', request)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 h-7 rounded-md"
                          onClick={() => handleAction('reject', request)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to 10 of 55 entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-gray-500"/>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                 <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                 <PaginationItem>
                  <PaginationLink href="#">6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawRequest;