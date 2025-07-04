import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Loader2 } from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- THIS LINE WAS MISSING ---
import { cn } from "@/lib/utils";


// --- UPDATED Mock Data and API Function ---
const allData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    userName: `Player_0${i + 1}`,
    amount: (Math.floor(Math.random() * 20) + 1) * 500,
    requestNo: `REQ-${1001 + i}`,
    receiptImage: `https://picsum.photos/seed/${i+1}/800/1200`, // Placeholder image URL
    date: new Date(new Date('2025-06-30').getTime() - i * 3600 * 1000).toLocaleString(),
    status: 'Pending',
}));

const fetchFundRequests = async (params) => {
  console.log("Holding selected data and hitting dummy API with params:", params);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = allData.filter(item => 
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

  // --- State for modals ---
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'

  useEffect(() => {
    const getFundRequests = async () => {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: parseInt(entriesToShow, 10),
        search: searchTerm,
      };
      
      let filteredData = allData.filter(item => 
        item.userName.toLowerCase().includes(params.search.toLowerCase())
      );
      const total = filteredData.length;
      const paginatedData = filteredData.slice(
        (params.page - 1) * params.limit,
        params.page * params.limit
      );

      setData(paginatedData);
      setTotalEntries(total);
      setLoading(false);
    };

    getFundRequests();
  }, [currentPage, entriesToShow, searchTerm]);
  
  // --- Modal Handlers ---
  const handleViewImage = (url) => {
    setImageUrl(url);
    setIsImageModalOpen(true);
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
    // Also update the master list so the change persists across pages/searches
    const masterIndex = allData.findIndex(item => item.id === selectedRequest.id);
    if(masterIndex !== -1) {
        allData[masterIndex].status = actionType === 'approve' ? 'Approved' : 'Rejected';
    }
    
    setIsActionModalOpen(false);
  };

  const totalPages = Math.ceil(totalEntries / parseInt(entriesToShow, 10)) || 1;
  const startEntry = totalEntries > 0 ? (currentPage - 1) * parseInt(entriesToShow, 10) + 1 : 0;
  const endEntry = Math.min(currentPage * parseInt(entriesToShow, 10), totalEntries);

  return (
    <>
      <div className="bg-[#f8f9fa] min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-full mx-auto shadow-sm">
          <CardHeader><CardTitle className="text-xl font-bold text-gray-800">Fund Request List</CardTitle></CardHeader>
          <CardContent>
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Show</span>
                <Select value={entriesToShow} onValueChange={(value) => { setEntriesToShow(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm text-gray-700">Search:</Label>
                <Input id="search" type="text" className="w-full sm:w-[250px]" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
              </div>
            </div>
            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    {["#", "User Name", "Amount", "Request No.", "Receipt Image", "Date", "Status", "Action"].map((header) => (
                      <TableHead key={header} className="px-4 py-3 text-sm font-bold text-gray-600 whitespace-nowrap">{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={8} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                  ) : data.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="h-24 text-center text-gray-500">No data available in table</TableCell></TableRow>
                  ) : (
                    data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{startEntry + index}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.requestNo}</TableCell>
                        <TableCell><Button variant="link" size="sm" onClick={() => handleViewImage(item.receiptImage)}>View</Button></TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell><Badge variant={item.status === 'Approved' ? 'success' : item.status === 'Rejected' ? 'destructive' : 'secondary'}>{item.status}</Badge></TableCell>
                        <TableCell className="flex gap-2">
                          {item.status === 'Pending' ? (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleActionClick(item, 'approve')}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={() => handleActionClick(item, 'reject')}>Reject</Button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">Completed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm text-gray-700">
              <div>Showing {startEntry} to {endEntry} of {totalEntries} entries</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-xl"><DialogHeader><DialogTitle>Receipt Image</DialogTitle></DialogHeader><img src={imageUrl} alt="Receipt" className="rounded-md mt-4" /></DialogContent>
      </Dialog>
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to <span className={cn("font-semibold", actionType === 'approve' ? 'text-green-600' : 'text-red-600')}>{actionType}</span> the fund request <span className="font-semibold">{selectedRequest?.requestNo}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button className={cn(actionType === 'approve' && 'bg-green-600 hover:bg-green-700')} variant={actionType === 'reject' ? 'destructive' : 'default'} onClick={handleConfirmAction}>Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FundRequest;