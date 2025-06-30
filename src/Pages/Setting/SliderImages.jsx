import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";

// --- DUMMY DATA ---
// This data should be replaced with data from your backend API.
const sliderData = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/120x50/2563eb/ffffff?text=Banner+1',
    displayOrder: '01',
    creationDate: '27 Jan 2025 05:26:03 PM',
    status: 'Active',
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/120x50/333/ffffff?text=Event+Promo',
    displayOrder: '1',
    creationDate: '27 Jan 2025 01:23:12 PM',
    status: 'Active',
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/120x50/e11d48/ffffff?text=Kalyan+Live',
    displayOrder: '3',
    creationDate: '11 Aug 2024 06:02:24 PM',
    status: 'Inactive',
  },
  {
    id: 4,
    imageUrl: 'https://placehold.co/120x50/f97316/ffffff?text=Offer',
    displayOrder: '2',
    creationDate: '11 Aug 2024 06:02:14 PM',
    status: 'Inactive',
  },
];

// --- DUMMY API HANDLER ---
// This function simulates an API call.
const handleApiCall = async (action, data) => {
  console.log(`[API Call Start] Action: ${action}`, data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`[API Call Success] Action "${action}" for item ID ${data.id} completed.`);
  alert(`Simulated Action: "${action}" on item #${data.id}.\nCheck the browser console for details.`);
};


const SliderImage = () => {
  
  const handleDelete = (item) => {
    // In a real app, you would probably want a confirmation modal first.
    const formData = {
      id: item.id,
      // you can add any other required fields for your backend
    };
    handleApiCall('Delete', formData);
  };

  const handleToggleStatus = (item) => {
    const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
    const formData = {
      id: item.id,
      status: newStatus,
    };
    handleApiCall(`Set Status to ${newStatus}`, formData);
  };
  
  const handleAddSliderImage = () => {
    // This would typically open a new page or a modal form.
    alert("This would open a form to add a new slider image.");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Slider Image Management</CardTitle>
          <Button onClick={handleAddSliderImage} className="bg-blue-600 hover:bg-blue-700">Add Slider Image</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Search:</span>
              <Input type="search" className="w-full sm:w-auto" />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[50px] font-bold text-black">#</TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Slider Image <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Display Order <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Creation Date <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Status <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Action <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliderData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <img src={item.imageUrl} alt={`Slider ${item.id}`} className="h-10 w-auto" />
                    </TableCell>
                    <TableCell>{item.displayOrder}</TableCell>
                    <TableCell>{item.creationDate}</TableCell>
                    <TableCell>
                      {item.status === 'Active' ? (
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-rose-600 rounded-md">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 h-auto"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </Button>
                        {item.status === 'Active' ? (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-auto"
                            onClick={() => handleToggleStatus(item)}
                          >
                            Inactivate
                          </Button>
                        ) : (
                           <Button
                            size="sm"
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 h-auto"
                            onClick={() => handleToggleStatus(item)}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="text-sm text-gray-700">
              Showing 1 to 4 of 4 entries
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="text-gray-500 border-gray-300">Previous</Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-8 h-8 p-0">1</Button>
              <Button variant="outline" size="sm" className="text-gray-500 border-gray-300">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SliderImage;