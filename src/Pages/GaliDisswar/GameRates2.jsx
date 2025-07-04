import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Import Dialog components and a loader icon
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

// Helper function to format form keys into readable labels for the modal
const formatLabel = (key) => {
  const result = key.replace(/([A-Z0-9])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};


const GameRates2 = () => {
  // State for form data (no changes)
  const [formData, setFormData] = useState({
    singleDigitValue1: '10',
    singleDigitValue2: '95',
    singlePanaValue1: '10',
    singlePanaValue2: '95',
    doublePanaValue1: '10',
    doublePanaValue2: '950',
  });
  
  // --- NEW: State for modal and loading status ---
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handler to update state (no changes)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // MODIFIED: This now opens the confirmation modal instead of submitting directly
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  // NEW: This handler contains the actual API submission logic and is called from the modal
  const handleConfirmSubmit = async () => {
    setIsLoading(true); // Start loading
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Dummy API Response:", result);
        alert('Game rates submitted successfully!');
      } else {
        console.error("API submission failed with status:", response.status);
        alert('Failed to submit game rates.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('An error occurred while submitting the form.');
    } finally {
      setIsLoading(false); // Stop loading
      setIsConfirmModalOpen(false); // Close the modal
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-slate-50 p-4">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add Games Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The form now calls the modified handleSubmit */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  <div className="space-y-2"><Label htmlFor="singleDigitValue1">Single Digit Value 1</Label><Input id="singleDigitValue1" name="singleDigitValue1" value={formData.singleDigitValue1} onChange={handleChange} className="text-base" /></div>
                  <div className="space-y-2"><Label htmlFor="singlePanaValue1">Single Pana Value 1</Label><Input id="singlePanaValue1" name="singlePanaValue1" value={formData.singlePanaValue1} onChange={handleChange} className="text-base" /></div>
                  <div className="space-y-2"><Label htmlFor="doublePanaValue1">Double Pana Value 1</Label><Input id="doublePanaValue1" name="doublePanaValue1" value={formData.doublePanaValue1} onChange={handleChange} className="text-base" /></div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  <div className="space-y-2"><Label htmlFor="singleDigitValue2">Single Digit Value 2</Label><Input id="singleDigitValue2" name="singleDigitValue2" value={formData.singleDigitValue2} onChange={handleChange} className="text-base" /></div>
                  <div className="space-y-2"><Label htmlFor="singlePanaValue2">Single Pana Value 2</Label><Input id="singlePanaValue2" name="singlePanaValue2" value={formData.singlePanaValue2} onChange={handleChange} className="text-base" /></div>
                  <div className="space-y-2"><Label htmlFor="doublePanaValue2">Double Pana Value 2</Label><Input id="doublePanaValue2" name="doublePanaValue2" value={formData.doublePanaValue2} onChange={handleChange} className="text-base" /></div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button type="submit" size="lg">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm New Game Rates</DialogTitle>
            <DialogDescription>
              Please review the following rates before submitting. This action will update the game values.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 space-y-2 rounded-md border p-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{formatLabel(key)}:</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmSubmit} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameRates2;