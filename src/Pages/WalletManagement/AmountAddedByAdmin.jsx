import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Import shadcn/ui components
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
import { Button } from '@/components/ui/button'; // Ensure Button is imported

// Dummy data for the summary cards
const summaryData = [
  { title: "Today Amount", value: "₹0.00", color: "bg-[#0d6efd]" },
  { title: "Last 7 Days", value: "₹1,663.00", color: "bg-[#198754]" },
  { title: "Last 30 Days", value: "₹3,721.00", color: "bg-[#ffc107]" },
  { title: "Total Amount", value: "₹7,143.00", color: "bg-[#dc3545]" },
];

// Dummy data for the transactions table.
const transactionsData = [
  { id: 1, name: "Bpn", amount: 1663, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "23 Jun 2025 09:43:18 PM", txReqNo: "552428" },
  { id: 2, name: "Rituraj Singhal", amount: 458, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "20 Jun 2025 11:26:04 AM", txReqNo: "201751" },
  { id: 3, name: "Rituraj Singhal", amount: 200, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "15 Jun 2025 09:43:35 AM", txReqNo: "646244" },
  { id: 4, name: "Rituraj Singhal", amount: 100, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "14 Jun 2025 09:45:18 AM", txReqNo: "846431" },
  { id: 5, name: "Vinod Sonawane", amount: 500, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "08 Jun 2025 09:41:40 AM", txReqNo: "574959" },
  { id: 6, name: "Mana Bhai Thakormana", amount: 300, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "06 Jun 2025 09:16:18 AM", txReqNo: "657334" },
  { id: 7, name: "Mana Bhai Thakormana", amount: 300, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "05 Jun 2025 09:40:17 PM", txReqNo: "808222" },
  { id: 8, name: "Ram Nishad", amount: 200, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "02 Jun 2025 08:12:16 PM", txReqNo: "241693" },
  { id: 9, name: "Ashiees", amount: 1500, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "22 May 2025 07:23:34 PM", txReqNo: "670096" },
  { id: 10, name: "Ajay", amount: 300, transactionNote: "Amount Added By Admin", transferNote: "N/A", date: "19 May 2025 07:55:22 PM", txReqNo: "435011" },
];

const AmountAddedByAdmin = () => {
  // --- NEW: State for modals ---
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
    
  // --- NEW: Modal handlers ---
  const handleUserClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUserModalOpen(true);
  };
  
  const handleSummaryClick = (summary) => {
    setSelectedSummary(summary);
    setIsSummaryModalOpen(true);
  };

  const StatCard = ({ title, value, color, onClick }) => (
    <button onClick={onClick} className={`${color} text-white p-5 rounded-lg shadow flex flex-col justify-center text-left w-full hover:opacity-90 transition-opacity`}>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </button>
  );

  const TableHeaderItem = ({ children }) => (
    <TableHead><button className="flex items-center gap-2"><span className="font-semibold text-gray-700">{children}</span><ArrowUpDown className="h-4 w-4 text-gray-400" /></button></TableHead>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6"><h1 className="text-xl font-semibold text-gray-800">AMOUNT ADDED BY ADMIN</h1><span className="text-sm text-gray-500">Amount</span></div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData.map((item, index) => (
              <StatCard key={index} {...item} onClick={() => handleSummaryClick(item)} />
            ))}
          </div>
          {/* Main Table Card */}
          <Card className="w-full shadow-sm">
            <CardHeader><CardTitle>User wise Amount</CardTitle></CardHeader>
            <CardContent>
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700"><span>Show</span><Select defaultValue="10"><SelectTrigger className="w-[80px]"><SelectValue placeholder="10" /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entries</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><span>Search:</span><Input type="search" className="w-auto sm:w-[250px]" /></div>
              </div>
              {/* Table */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50"><TableHeaderItem>#</TableHeaderItem><TableHeaderItem>Name</TableHeaderItem><TableHeaderItem>Amount</TableHeaderItem><TableHeaderItem>Transaction Note</TableHeaderItem><TableHeaderItem>Transfer Note</TableHeaderItem><TableHeaderItem>Date</TableHeaderItem><TableHeaderItem>Tx Req. No.</TableHeaderItem></TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionsData.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell><button onClick={() => handleUserClick(tx)} className="text-blue-600 hover:underline">{tx.name}</button></TableCell>
                        <TableCell className="font-medium whitespace-nowrap">+ {tx.amount.toLocaleString('en-IN')} ₹</TableCell>
                        <TableCell>{tx.transactionNote}</TableCell><TableCell>{tx.transferNote}</TableCell>
                        <TableCell className="whitespace-nowrap">{tx.date}</TableCell><TableCell>{tx.txReqNo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <div className="text-sm text-muted-foreground">Showing 1 to 10 of 16 entries</div>
                <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" className="text-gray-500" /></PaginationItem><PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* --- MODALS SECTION --- */}
      {/* User Transaction Details Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Transaction Details</DialogTitle><DialogDescription>Details for transaction #{selectedTransaction?.txReqNo}</DialogDescription></DialogHeader>
          <div className="grid gap-2 py-4 text-sm">
            <div className="flex justify-between"><span>User Name:</span> <span className="font-medium">{selectedTransaction?.name}</span></div>
            <div className="flex justify-between"><span>Amount:</span> <span className="font-medium text-green-600">+ {selectedTransaction?.amount.toLocaleString('en-IN')} ₹</span></div>
            <div className="flex justify-between"><span>Date:</span> <span className="font-medium">{selectedTransaction?.date}</span></div>
            <div className="flex justify-between"><span>Transaction Note:</span> <span className="font-medium">{selectedTransaction?.transactionNote}</span></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Summary Card Details Modal */}
      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selectedSummary?.title}</DialogTitle><DialogDescription>Summary of amount added by admin.</DialogDescription></DialogHeader>
          <div className="py-4 text-center">
            <p className="text-4xl font-bold">{selectedSummary?.value}</p>
            <p className="text-sm text-muted-foreground mt-2">Total amount for the selected period.</p>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AmountAddedByAdmin;