import React, { useState } from 'react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// --- NEW: Import Dialog components and a loader icon ---
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


// Initial state for the game rates form
const initialRates = {
  singleDigitValue1: '10', singleDigitValue2: '100',
  jodiDigitValue1: '10', jodiDigitValue2: '1000',
  singlePanaValue1: '10', singlePanaValue2: '1500',
  doublePanaValue1: '10', doublePanaValue2: '3000',
  tripplePanaValue1: '10', tripplePanaValue2: '7000',
  halfSangamValue1: '10', halfSangamValue2: '10000',
  fullSangamValue1: '10', fullSangamValue2: '100000',
};

// A reusable input component
const RateInput = ({ label, id, value, onChange, disabled }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="font-medium text-gray-700">{label}</Label>
    <Input id={id} type="number" value={value} onChange={onChange} disabled={disabled} required />
  </div>
);

// Helper function to format form keys into readable labels for the modal
const formatLabel = (key) => {
  const result = key.replace(/([A-Z0-9])/g, " $1").replace('Value', ' Value ');
  return result.charAt(0).toUpperCase() + result.slice(1);
};


const GameRates3 = () => {
  const [rates, setRates] = useState(initialRates);
  // --- MODAL: State for modals and loading status ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRates(prevRates => ({ ...prevRates, [id]: value }));
  };

  // --- MODAL: This now opens the confirmation modal ---
  const handleOpenConfirmation = (event) => {
    event.preventDefault();
    setIsConfirmModalOpen(true);
  };
  
  // --- MODAL: This new function handles the actual API call ---
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    const formData = {
      singleDigit: { value1: Number(rates.singleDigitValue1), value2: Number(rates.singleDigitValue2) },
      jodiDigit: { value1: Number(rates.jodiDigitValue1), value2: Number(rates.jodiDigitValue2) },
      singlePana: { value1: Number(rates.singlePanaValue1), value2: Number(rates.singlePanaValue2) },
      doublePana: { value1: Number(rates.doublePanaValue1), value2: Number(rates.doublePanaValue2) },
      tripplePana: { value1: Number(rates.tripplePanaValue1), value2: Number(rates.tripplePanaValue2) },
      halfSangam: { value1: Number(rates.halfSangamValue1), value2: Number(rates.halfSangamValue2) },
      fullSangam: { value1: Number(rates.fullSangamValue1), value2: Number(rates.fullSangamValue2) },
    };
    console.log('Form Data to be sent to API:', formData);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      alert('Game rates updated successfully! (Simulated)');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false); // Close the modal
    }
  };

  const formFields = [
    { id: 'singleDigit', label: 'Single Digit' }, { id: 'jodiDigit', label: 'Jodi Digit' },
    { id: 'singlePana', label: 'Single Pana' }, { id: 'doublePana', label: 'Double Pana' },
    { id: 'tripplePana', label: 'Tripple Pana' }, { id: 'halfSangam', label: 'Half Sangam' },
    { id: 'fullSangam', label: 'Full Sangam' },
  ];

  return (
    <>
      {/* RESPONSIVE: Added padding for different screen sizes */}
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Add Games Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The form now calls handleOpenConfirmation */}
            <form onSubmit={handleOpenConfirmation}>
              {/* RESPONSIVE: Stacks to 1 column on mobile, 2 on medium screens up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {formFields.map(field => (
                  <React.Fragment key={field.id}>
                    <RateInput label={`${field.label} Value 1`} id={`${field.id}Value1`} value={rates[`${field.id}Value1`]} onChange={handleInputChange} disabled={isSubmitting} />
                    <RateInput label={`${field.label} Value 2`} id={`${field.id}Value2`} value={rates[`${field.id}Value2`]} onChange={handleInputChange} disabled={isSubmitting} />
                  </React.Fragment>
                ))}
              </div>
              
              {/* RESPONSIVE: Full-width on mobile, auto-width on larger screens */}
              <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* --- MODAL: Confirmation Dialog --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm New Game Rates</DialogTitle>
            <DialogDescription>
              Please review the following rates before submitting. This action will update the game values.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 space-y-2 rounded-md border p-4 max-h-60 overflow-y-auto">
            {Object.entries(rates).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{formatLabel(key)}:</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameRates3;