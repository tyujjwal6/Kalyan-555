import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// A reusable input field component to reduce repetition
const FormField = ({ label, id, value, onChange }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <Input
      id={id}
      name={id} // Use id as name for easier handling in the change handler
      type="number"
      value={value}
      onChange={onChange}
      className="mt-1"
    />
  </div>
);

// Helper function to format the camelCase keys for display
const formatLabel = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};


const GameRates = () => {
  // State to hold all form values in a single object
  const [rates, setRates] = useState({
    singleDigitValue1: '10',
    singleDigitValue2: '100',
    singlePanaValue1: '10',
    singlePanaValue2: '1500',
    doublePanaValue1: '10',
    doublePanaValue2: '3000',
    // Naming matches the typo in the image for exact replication
    tripplePanaValue1: '10',
    tripplePanaValue2: '7000',
  });

  // --- NEW: State to control the confirmation modal ---
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // A single handler to update the state based on input name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates(prevRates => ({
      ...prevRates,
      [name]: value,
    }));
  };

  // Handler for form submission - NOW opens the modal instead of submitting directly
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  // --- NEW: Handler for the final confirmation inside the modal ---
  const handleConfirmSubmit = () => {
    // Simulate hitting a dummy API with the collected form data
    console.log("Submitting Game Rates to API:", rates);
    alert("Dummy API call successful! Check the console for the submitted data.");
    
    // Close the modal after submission
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-4xl shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Add Games Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
                {/* Row 1 */}
                <FormField label="Single Digit Value 1" id="singleDigitValue1" value={rates.singleDigitValue1} onChange={handleChange} />
                <FormField label="Single Digit Value 2" id="singleDigitValue2" value={rates.singleDigitValue2} onChange={handleChange} />

                {/* Row 2 */}
                <FormField label="Single Pana Value 1" id="singlePanaValue1" value={rates.singlePanaValue1} onChange={handleChange} />
                <FormField label="Single Pana Value 2" id="singlePanaValue2" value={rates.singlePanaValue2} onChange={handleChange} />

                {/* Row 3 */}
                <FormField label="Double Pana Value 1" id="doublePanaValue1" value={rates.doublePanaValue1} onChange={handleChange} />
                <FormField label="Double Pana Value 2" id="doublePanaValue2" value={rates.doublePanaValue2} onChange={handleChange} />
                
                {/* Row 4 */}
                <FormField label="Tripple Pana Value 1" id="tripplePanaValue1" value={rates.tripplePanaValue1} onChange={handleChange} />
                <FormField label="Tripple Pana Value 2" id="tripplePanaValue2" value={rates.tripplePanaValue2} onChange={handleChange} />
              </div>

              <div className="mt-8">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Please review the game rates before submitting. This action cannot be easily undone.
            </DialogDescription>
          </DialogHeader>
          
          {/* Displaying the rates to be submitted for review */}
          <div className="my-4 space-y-2 rounded-md border p-4">
            <h4 className="mb-2 font-medium text-center">Rates to be Submitted</h4>
            {Object.entries(rates).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{formatLabel(key)}:</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmSubmit}>
              Confirm & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameRates;