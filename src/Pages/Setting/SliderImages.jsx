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


// --- DUMMY DATA ---
const initialSliderData = [
  { id: 1, imageUrl: 'https://placehold.co/120x50/2563eb/ffffff?text=Banner+1', displayOrder: '01', creationDate: '27 Jan 2025 05:26:03 PM', status: 'Active' },
  { id: 2, imageUrl: 'https://placehold.co/120x50/333/ffffff?text=Event+Promo', displayOrder: '1', creationDate: '27 Jan 2025 01:23:12 PM', status: 'Active' },
  { id: 3, imageUrl: 'https://placehold.co/120x50/e11d48/ffffff?text=Kalyan+Live', displayOrder: '3', creationDate: '11 Aug 2024 06:02:24 PM', status: 'Inactive' },
  { id: 4, imageUrl: 'https://placehold.co/120x50/f97316/ffffff?text=Offer', displayOrder: '2', creationDate: '11 Aug 2024 06:02:14 PM', status: 'Inactive' },
];

const SliderImage = () => {
  const [data, setData] = useState(initialSliderData);

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
    console.log("Adding new slider:", newItem);
    setData(prev => [...prev, {
      id: Date.now(),
      ...newItem,
      creationDate: new Date().toLocaleString(),
      status: 'Active',
    }]);
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting slider:", selectedItem);
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
            <CardTitle>Slider Image Management</CardTitle>
            <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Add Slider Image</Button>
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
                <span className="text-sm text-gray-700">Search:</span><Input type="search" className="w-full sm:w-auto" />
              </div>
            </div>
            
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>#</TableHead><TableHead>Slider Image</TableHead><TableHead>Display Order</TableHead>
                    <TableHead>Creation Date</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell><img src={item.imageUrl} alt={`Slider ${item.id}`} className="h-10 w-auto rounded" /></TableCell>
                      <TableCell>{item.displayOrder}</TableCell><TableCell>{item.creationDate}</TableCell>
                      <TableCell>
                        <span className={cn("inline-block px-3 py-1 text-xs font-medium text-white rounded-md", item.status === 'Active' ? 'bg-green-600' : 'bg-rose-600')}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 h-auto" onClick={() => handleDeleteClick(item)}>Delete</Button>
                          <Button size="sm" className={cn("text-white text-xs px-3 py-1 h-auto", item.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : 'bg-rose-600 hover:bg-rose-700')} onClick={() => handleToggleClick(item)}>
                            {item.status === 'Active' ? 'Inactivate' : 'Activate'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      {isAddModalOpen && <AddSliderModal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleConfirmAdd} />}

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Are you sure you want to delete this slider image? This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
      
      <Dialog open={isToggleModalOpen} onOpenChange={setIsToggleModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Confirm Status Change</DialogTitle><DialogDescription>Are you sure you want to set this slider to <span className="font-bold">{selectedItem?.status === 'Active' ? 'Inactive' : 'Active'}</span>?</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleConfirmToggle}>Confirm</Button></DialogFooter></DialogContent>
      </Dialog>
    </>
  );
};

// --- NEW: Reusable Add Slider Modal Form ---
const AddSliderModal = ({ isOpen, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState({ imageUrl: '', displayOrder: '' });
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageUrl: file.name }));
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const handleSave = () => {
    if (formData.imageUrl && formData.displayOrder) {
      onSave(formData);
    } else {
      alert("Please provide an image and a display order.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Slider Image</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input id="displayOrder" type="number" value={formData.displayOrder} onChange={(e) => setFormData(prev => ({...prev, displayOrder: e.target.value }))} placeholder="e.g., 1" />
          </div>
          <div className="space-y-2">
            <Label>Slider Image</Label>
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
          <Button onClick={handleSave}>Save Slider</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SliderImage;