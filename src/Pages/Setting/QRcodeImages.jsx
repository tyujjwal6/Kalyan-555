import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";

// --- DUMMY DATA ---
// We use an empty array to represent the "No data" state as shown in the image.
const qrCodeData = [];

// --- DUMMY API HANDLER ---
// This function simulates an API call.
const handleApiCall = async (action, data) => {
  console.log(`[API Call Start] Action: ${action}`, data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`[API Call Success] Action "${action}" completed.`);
  alert(`Simulated Action: "${action}".\nCheck the browser console for details.`);
};


const QRCodeImages = () => {
  
  // This would typically open a new page or a modal with a form.
  const handleAddQrImage = () => {
    // This is where you would collect form data for a new QR Image.
    // For this example, we'll simulate it with a dummy object.
    const newImageData = {
      // e.g., imageData: "base64-encoded-string-or-file-object",
      //       status: "Active"
      action: "Prepare to add new QR Image"
    };
    handleApiCall('Add QR Image', newImageData);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>QR Image Management</CardTitle>
          <Button onClick={handleAddQrImage} className="bg-blue-600 hover:bg-blue-700">Add QR Image</Button>
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
                  <TableHead className="font-bold text-black"><div className="flex items-center">QR Image <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Creation Date <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Status <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                  <TableHead className="font-bold text-black"><div className="flex items-center">Action <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodeData.length > 0 ? (
                  qrCodeData.map((item) => (
                    // This part is for when you have data.
                    // It won't be rendered in this empty state example.
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <img src={item.imageUrl} alt={`QR Code ${item.id}`} className="h-12 w-12" />
                      </TableCell>
                      <TableCell>{item.creationDate}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{/* Action Buttons */}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  // This is the empty state row shown in the image.
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No data available in table
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="text-sm text-gray-700">
              Showing 0 to 0 of 0 entries
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="text-gray-400 border-gray-300 cursor-not-allowed">Previous</Button>
              <Button variant="outline" size="sm" className="text-gray-400 border-gray-300 cursor-not-allowed">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeImages;