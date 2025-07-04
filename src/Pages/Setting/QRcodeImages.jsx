import React, { useState } from 'react';
import { ArrowUpDown, Upload } from 'lucide-react';

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// --- NEW: Import Dialog and cn utility ---
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


// --- DUMMY DATA: Using some data to demonstrate functionality ---
const initialQrCodeData = [
    { id: 1, imageUrl: 'https://placehold.co/100x100/34d399/ffffff?text=Active+QR', creationDate: '28 Jan 2025 10:30:15 AM', status: 'Active' },
    { id: 2, imageUrl: 'https://placehold.co/100x100/f87171/ffffff?text=Inactive+QR', creationDate: '27 Jan 2025 11:05:45 AM', status: 'Inactive' },
];

const QRCodeImages = () => {
  const [data, setData] = useState(initialQrCodeData);

  // --- NEW: State for modals ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // --- NEW: Modal Handlers ---
  const handleAddClick = () => setIsAddModalOpen(true);
  
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };
  
  const handleToggleClick = (item) => {
    setSelectedItem(item);
    setIsToggleModalOpen(true);
  };
  
  const handleConfirmAdd = (newItem) => {
    console.log("Adding new QR Code:", newItem);
    setData(prev => [...prev, {
      id: Date.now(),
      ...newItem,
      creationDate: new Date().toLocaleString(),
    }]);
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting QR Code:", selectedItem);
    setData(prev => prev.filter(item => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
  };

  const handleConfirmToggle = () => {
    console.log("Toggling status for:", selectedItem);
    const newStatus = selectedItem.status === 'Active' ? 'Inactive' : 'Active';
    setData(prev => prev.map(item => item.id === selectedItem.id ? { ...item, status: newStatus } : item));
    setIsToggleModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full">
          {/* RESPONSIVE: Header stacks on mobile */}
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>QR Image Management</CardTitle>
            <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Add QR Image</Button>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Controls stack on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-700">Show</span>
                <Select defaultValue="10"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem></SelectContent></Select>
                <span className="text-sm text-gray-700">entries</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-700 shrink-0">Search:</span><Input type="search" className="w-full sm:w-auto" />
              </div>
            </div>
            
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>#</TableHead><TableHead>QR Image</TableHead><TableHead>Creation Date</TableHead>
                    <TableHead>Status</TableHead><TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell><img src={item.imageUrl} alt={`QR Code ${item.id}`} className="h-12 w-12 rounded" /></TableCell>
                        <TableCell>{item.creationDate}</TableCell>
                        <TableCell>
                          <span className={cn("inline-block px-3 py-1 text-xs font-medium text-white rounded-md", item.status === 'Active' ? 'bg-green-600' : 'bg-rose-600')}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(item)}>Delete</Button>
                            <Button size="sm" className={cn(item.status === 'Active' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700')} onClick={() => handleToggleClick(item)}>
                              {item.status === 'Active' ? 'Inactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={5} className="h-24 text-center">No data available in table</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      {isAddModalOpen && <AddQRModal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleConfirmAdd} />}

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Are you sure you want to delete this QR code? This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
      
      <Dialog open={isToggleModalOpen} onOpenChange={setIsToggleModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Confirm Status Change</DialogTitle><DialogDescription>Are you sure you want to set this QR code to <span className="font-bold">{selectedItem?.status === 'Active' ? 'Inactive' : 'Active'}</span>?</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmToggle}>Confirm</Button></DialogFooter></DialogContent>
      </Dialog>
    </>
  );
};

// --- NEW: Reusable Add QR Code Modal Form ---
const AddQRModal = ({ isOpen, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState({ imageUrl: '', status: 'Active' });
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageUrl: file.name })); // In real app, you'd handle the file object
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const handleSave = () => {
    if (formData.imageUrl && formData.status) {
      onSave(formData);
    } else {
      alert("Please upload an image and select a status.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New QR Image</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({...prev, status: value}))}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>QR Image</Label>
            <div className="flex items-center justify-center w-full">
                <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {preview ? <img src={preview} alt="Preview" className="h-full object-contain p-2"/> : 
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
                    </div>}
                    <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </Label>
            </div> 
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button onClick={handleSave}>Save QR Code</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeImages;