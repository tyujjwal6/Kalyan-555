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
const initialData = [
  { id: 1, userName: 'Asif', mobile: '7737270676', email: 'temp@gmail.com', date: '29 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 2, userName: 'Roopanna Kambale', mobile: '9108638044', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 3, userName: 'Sanirun Bibi', mobile: '9394990663', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 4, userName: 'Vivek', mobile: '8602285936', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: true },
  { id: 5, userName: 'Suresh Verma', mobile: '8602722173', email: 'temp@gmail.com', date: '28 Jun 2025', balance: 9, betting: false, transfer: false, active: false },
];

const generateFullData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % 5;
    data.push({ ...initialData[baseIndex], id: i + 1, mobile: (Math.random() * 10000000000).toFixed(0).toString().slice(0, 10) });
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

  // --- NEW: State for modals ---
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [isUnapprovedModalOpen, setIsUnapprovedModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggleInfo, setToggleInfo] = useState({ field: '', label: '' });

  // --- NEW: Modal Handlers ---
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };
  
  const handleToggleClick = (user, field, label) => {
    setSelectedUser(user);
    setToggleInfo({ field, label });
    setIsToggleModalOpen(true);
  };
  
  const handleConfirmToggle = () => {
    if (!selectedUser || !toggleInfo.field) return;

    console.log(`Toggling ${toggleInfo.field} for user ${selectedUser.userName}`);
    setData(prevData =>
      prevData.map(user =>
        user.id === selectedUser.id
          ? { ...user, [toggleInfo.field]: !user[toggleInfo.field] }
          : user
      )
    );
    setIsToggleModalOpen(false);
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div><h1 className="text-2xl font-bold">USER LIST</h1><div className="text-sm text-gray-500">Dashboards / User List</div></div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setIsUnapprovedModalOpen(true)}>Un-approved Users List</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2"><span>Show</span><Select value={entriesToShow.toString()} onValueChange={(value) => { setEntriesToShow(Number(value)); setCurrentPage(1); }}><SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entries</span></div>
                <div className="flex items-center gap-2"><label htmlFor="search">Search:</label><Input id="search" type="text" className="w-full sm:w-auto" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} /></div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>{getSortableHeader('id', '#')}{getSortableHeader('userName', 'User Name')}{getSortableHeader('mobile', 'Mobile')}{getSortableHeader('email', 'email')}{getSortableHeader('date', 'Date')}{getSortableHeader('balance', 'Balance')}{getSortableHeader('betting', 'Betting')}{getSortableHeader('transfer', 'Transfer')}{getSortableHeader('active', 'Active')}<TableHead>View</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell><button onClick={() => handleViewUser(user)} className="text-blue-600 hover:underline">{user.userName}</button></TableCell>
                        <TableCell><div className="flex items-center gap-2"><span>{user.mobile}</span><a href={`https://wa.me/${user.mobile}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white rounded-full p-1.5 inline-flex hover:bg-green-600"><MessageCircle size={14} /></a><a href={`tel:${user.mobile}`} className="bg-blue-500 text-white rounded-full p-1.5 inline-flex hover:bg-blue-600"><Phone size={14} /></a></div></TableCell>
                        <TableCell>{user.email}</TableCell><TableCell>{user.date}</TableCell><TableCell>₹{user.balance}</TableCell>
                        <TableCell><Button variant="outline" size="sm" className={cn("w-16", user.betting ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200")} onClick={() => handleToggleClick(user, 'betting', 'Betting')}>{user.betting ? 'Yes' : 'No'}</Button></TableCell>
                        <TableCell><Button variant="outline" size="sm" className={cn("w-16", user.transfer ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200")} onClick={() => handleToggleClick(user, 'transfer', 'Transfer')}>{user.transfer ? 'Yes' : 'No'}</Button></TableCell>
                        <TableCell><Button variant="outline" size="sm" className={cn("w-16", user.active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200")} onClick={() => handleToggleClick(user, 'active', 'Active')}>{user.active ? 'Yes' : 'No'}</Button></TableCell>
                        <TableCell><Button variant="ghost" size="icon" onClick={() => handleViewUser(user)} className="text-blue-500 hover:text-blue-700"><Eye size={20} /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination controls */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- MODALS SECTION --- */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
          <div className="grid gap-2 py-4 text-sm">
            <div className="flex justify-between"><span>ID:</span><span className="font-medium">{selectedUser?.id}</span></div>
            <div className="flex justify-between"><span>Name:</span><span className="font-medium">{selectedUser?.userName}</span></div>
            <div className="flex justify-between"><span>Mobile:</span><span className="font-medium">{selectedUser?.mobile}</span></div>
            <div className="flex justify-between"><span>Email:</span><span className="font-medium">{selectedUser?.email}</span></div>
            <div className="flex justify-between"><span>Balance:</span><span className="font-medium">₹{selectedUser?.balance}</span></div>
            <div className="flex justify-between"><span>Active:</span><Badge variant={selectedUser?.active ? "success" : "destructive"}>{selectedUser?.active ? "Yes" : "No"}</Badge></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isToggleModalOpen} onOpenChange={setIsToggleModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Status Change</DialogTitle><DialogDescription>Are you sure you want to {selectedUser?.[toggleInfo.field] ? 'disable' : 'enable'} {toggleInfo.label} for user <span className="font-semibold">{selectedUser?.userName}</span>?</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmToggle}>Confirm</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUnapprovedModalOpen} onOpenChange={setIsUnapprovedModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Un-approved Users</DialogTitle><DialogDescription>This is a placeholder. In a real application, a list of un-approved users would be displayed here.</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;