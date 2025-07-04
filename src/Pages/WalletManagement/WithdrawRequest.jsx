import React, { useState } from 'react';
import { ArrowUpDown, ExternalLink, Eye, Loader2 } from 'lucide-react';

// Import shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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


// Dummy data mirroring the image.
const initialData = [
  { id: 1, userName: "Deepak Lot", mobile: "9926552931", amount: 1000, requestNo: "2160024", date: "28 Jun 2025 08:16:33 AM", status: "Pending" },
  { id: 2, userName: "Deepak Lot", mobile: "9926552931", amount: 5009, requestNo: "7322462", date: "26 Jun 2025 08:20:19 AM", status: "Rejected" },
  { id: 3, userName: "Bhimanna", mobile: "9663981393", amount: 1000, requestNo: "9797934", date: "25 Jun 2025 07:14:43 AM", status: "Rejected" },
  { id: 4, userName: "Mehul Mistry", mobile: "9537104413", amount: 1000, requestNo: "8347449", date: "25 Jun 2025 07:02:15 AM", status: "Rejected" },
  { id: 5, userName: "Bhimanna", mobile: "9663981393", amount: 1700, requestNo: "2124976", date: "24 Jun 2025 08:49:54 AM", status: "Rejected" },
  // Adding another pending request for demonstration
  { id: 6, userName: "Rahul Yadav", mobile: "9455978202", amount: 4000, requestNo: "2446773", date: "21 Jun 2025 08:58:34 AM", status: "Pending" },
];

const WithdrawRequest = () => {
  // --- NEW: State management for data and modals ---
  const [data, setData] = useState(initialData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'

  // --- NEW: Modal handlers ---
  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };
  
  const handleUserClick = (request) => {
    setSelectedRequest(request);
    setIsUserModalOpen(true);
  };

  const handleActionClick = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setIsActionModalOpen(true);
  };
  
  const handleConfirmAction = () => {
    if (!selectedRequest || !actionType) return;

    console.log(`Action: ${actionType} for request:`, selectedRequest);
    // Update the local state to reflect the change
    setData(prevData =>
      prevData.map(item =>
        item.id === selectedRequest.id
          ? { ...item, status: actionType === 'approve' ? 'Approved' : 'Rejected' }
          : item
      )
    );
    setIsActionModalOpen(false);
  };

  const TableHeaderItem = ({ children }) => ( <TableHead><div className="flex items-center gap-2 cursor-pointer"><span className="font-semibold text-black">{children}</span><ArrowUpDown className="h-4 w-4 text-gray-400" /></div></TableHead> );

  return (
    <>
      <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <Card className="w-full shadow-sm">
          <CardHeader><CardTitle>Withdraw Request List</CardTitle></CardHeader>
          <CardContent>
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700"><span>Show</span><Select defaultValue="10"><SelectTrigger className="w-[80px]"><SelectValue placeholder="10" /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entries</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><span>Search:</span><Input type="search" className="w-auto sm:w-[250px]" /></div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader><TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHeaderItem>#</TableHeaderItem><TableHeaderItem>User Name</TableHeaderItem><TableHeaderItem>Mobile</TableHeaderItem>
                  <TableHeaderItem>Amount</TableHeaderItem><TableHeaderItem>Request No.</TableHeaderItem><TableHeaderItem>Date</TableHeaderItem>
                  <TableHeaderItem>Status</TableHeaderItem><TableHeaderItem>View</TableHeaderItem><TableHeaderItem>Action</TableHeaderItem>
                </TableRow></TableHeader>
                <TableBody>
                  {data.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <button onClick={() => handleUserClick(request)} className="flex items-center gap-1.5 text-blue-600 hover:underline"><>{request.userName}<ExternalLink className="h-4 w-4" /></></button>
                      </TableCell>
                      <TableCell>{request.mobile}</TableCell>
                      <TableCell>₹{request.amount.toLocaleString()}</TableCell>
                      <TableCell>{request.requestNo}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          request.status === 'Pending' ? 'secondary' :
                          request.status === 'Approved' ? 'success' : 'destructive'
                        }>{request.status}</Badge>
                      </TableCell>
                      <TableCell><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewClick(request)}><Eye className="h-5 w-5 text-blue-600" /></Button></TableCell>
                      <TableCell>
                        {request.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-7 rounded-md" onClick={() => handleActionClick(request, 'approve')}>Approve</Button>
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 h-7 rounded-md" onClick={() => handleActionClick(request, 'reject')}>Reject</Button>
                          </div>
                        ) : ( <span className="text-xs text-gray-500">Completed</span> )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <div className="text-sm text-muted-foreground">Showing 1 to 10 of 55 entries</div>
              <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" className="text-gray-500"/></PaginationItem><PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Withdrawal Request Details</DialogTitle><DialogDescription>Request No: {selectedRequest?.requestNo}</DialogDescription></DialogHeader>
          <div className="grid gap-2 py-4 text-sm"><div className="flex justify-between"><span>User Name:</span> <span className="font-medium">{selectedRequest?.userName}</span></div><div className="flex justify-between"><span>Mobile:</span> <span className="font-medium">{selectedRequest?.mobile}</span></div><div className="flex justify-between"><span>Amount:</span> <span className="font-medium text-lg">₹{selectedRequest?.amount.toLocaleString()}</span></div><div className="flex justify-between"><span>Date:</span> <span className="font-medium">{selectedRequest?.date}</span></div><div className="flex justify-between"><span>Status:</span> <Badge variant={selectedRequest?.status === 'Pending' ? 'secondary' : selectedRequest?.status === 'Approved' ? 'success' : 'destructive'}>{selectedRequest?.status}</Badge></div></div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* User Details Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>User Profile: {selectedRequest?.userName}</DialogTitle></DialogHeader>
          <div className="grid gap-2 py-4 text-sm"><div className="flex justify-between"><span>User Name:</span> <span className="font-medium">{selectedRequest?.userName}</span></div><div className="flex justify-between"><span>Mobile:</span> <span className="font-medium">{selectedRequest?.mobile}</span></div></div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Action Confirmation Modal */}
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Confirm Action</DialogTitle><DialogDescription>Are you sure you want to <span className={cn("font-semibold", actionType === 'approve' ? 'text-green-600' : 'text-red-600')}>{actionType}</span> this request?</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button className={cn(actionType === 'approve' && 'bg-blue-500 hover:bg-blue-600')} variant={actionType === 'reject' ? 'destructive' : 'default'} onClick={handleConfirmAction}>Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawRequest;