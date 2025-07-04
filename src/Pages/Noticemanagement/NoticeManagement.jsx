import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
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


const initialNotices = [
  { id: 1, title: 'TEST', content: 'TEST', date: '02 Oct 2023', status: 'Inactive' },
  { id: 2, title: 'Testing', content: 'hey! there users we are testing the app', date: '09 Nov 2022', status: 'Inactive' },
  { id: 3, title: 'Maintenance', content: 'Scheduled maintenance this weekend.', date: '15 Sep 2023', status: 'Active' },
];

const NoticeManagement = () => {
  const [data, setData] = useState(initialNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- NEW: State for modals ---
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // --- NEW: Modal Handlers ---
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedNotice(null);
    setIsFormModalOpen(true);
  };
  
  const handleEditClick = (notice) => {
    setModalMode('edit');
    setSelectedNotice(notice);
    setIsFormModalOpen(true);
  };
  
  const handleToggleClick = (notice) => {
    setSelectedNotice(notice);
    setIsToggleModalOpen(true);
  };
  
  const handleSaveNotice = (noticeData) => {
    if (modalMode === 'add') {
      setData(prev => [...prev, { ...noticeData, id: Date.now(), date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), status: 'Inactive' }]);
    } else {
      setData(prev => prev.map(n => n.id === noticeData.id ? noticeData : n));
    }
    setIsFormModalOpen(false);
  };
  
  const handleConfirmToggle = () => {
    if (!selectedNotice) return;
    const newStatus = selectedNotice.status === 'Active' ? 'Inactive' : 'Active';
    setData(prev => prev.map(n => n.id === selectedNotice.id ? { ...n, status: newStatus } : n));
    setIsToggleModalOpen(false);
  };

  const filteredData = useMemo(() => data.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [data, searchTerm]);
  const sortedData = useMemo(() => { let sortableItems = [...filteredData]; if (sortConfig.key) { sortableItems.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sortableItems; }, [filteredData, sortConfig]);
  const paginatedData = useMemo(() => { const startIndex = (currentPage - 1) * entriesPerPage; return sortedData.slice(startIndex, startIndex + entriesPerPage); }, [sortedData, currentPage, entriesPerPage]);
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const handleSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
        <Card className="shadow-sm">
          {/* RESPONSIVE: Header stacks on mobile */}
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Notice Management</CardTitle>
            <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Add Notice</Button>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Controls stack on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 w-full sm:w-auto">
                <span>Show</span><Select defaultValue="10" onValueChange={(value) => setEntriesPerPage(Number(value))}><SelectTrigger className="w-20 h-9"><SelectValue placeholder="10" /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entries</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Label htmlFor="search" className="text-sm text-gray-700 shrink-0">Search:</Label><Input id="search" type="text" className="w-full sm:w-64 h-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead><Button variant="ghost" onClick={() => handleSort('title')}>Notice Title <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                    <TableHead><Button variant="ghost" onClick={() => handleSort('content')}>Content <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                    <TableHead><Button variant="ghost" onClick={() => handleSort('date')}>Date <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                    <TableHead><Button variant="ghost" onClick={() => handleSort('status')}>Status <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((notice, index) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
                      <TableCell>{notice.title}</TableCell><TableCell>{notice.content}</TableCell><TableCell>{notice.date}</TableCell>
                      <TableCell><Badge className={cn("text-white", notice.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-600 hover:bg-pink-700')}>{notice.status}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 h-8" onClick={() => handleEditClick(notice)}>Edit</Button>
                          <Button variant="outline" size="sm" className={cn("h-8", notice.status === 'Active' ? 'border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600' : 'border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600')} onClick={() => handleToggleClick(notice)}>
                            {notice.status === 'Active' ? 'Deactivate' : 'Activate'}
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
            <div className="text-sm text-gray-600">Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, sortedData.length)} of {sortedData.length} entries</div>
            <Pagination>
                {/* Pagination logic can remain the same */}
            </Pagination>
          </CardFooter>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      {isFormModalOpen && <NoticeFormModal mode={modalMode} notice={selectedNotice} isOpen={isFormModalOpen} onOpenChange={setIsFormModalOpen} onSave={handleSaveNotice} />}
      
      <Dialog open={isToggleModalOpen} onOpenChange={setIsToggleModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Status Change</DialogTitle><DialogDescription>Are you sure you want to {selectedNotice?.status === 'Active' ? 'deactivate' : 'activate'} the notice titled "{selectedNotice?.title}"?</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmToggle}>Confirm</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Reusable Form Modal for Add/Edit
const NoticeFormModal = ({ mode, notice, isOpen, onOpenChange, onSave }) => {
    const [formData, setFormData] = useState(mode === 'edit' && notice ? notice : { title: '', content: '' });
    
    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value }));
    };

    const handleSave = () => onSave(formData);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader><DialogTitle>{mode === 'edit' ? 'Edit Notice' : 'Add New Notice'}</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="content">Content</Label><Input id="content" value={formData.content} onChange={(e) => handleChange('content', e.target.value)} /></div>
                </div>
                <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleSave}>Save</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NoticeManagement;