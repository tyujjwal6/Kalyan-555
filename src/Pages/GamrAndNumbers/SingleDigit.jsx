import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Send, Loader2 } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

/**
 * SingleDigit Component
 * 
 * Displays a selection of single-digit numbers (0-9).
 * - Allows a user to select a single number.
 * - Clicking the same number again deselects it.
 * - Includes a submit button that opens a confirmation modal before sending data.
 * - The component is fully responsive.
 */
const SingleDigit = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- MODAL: State for modals ---
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSelectNumber = (number) => {
    setSelectedNumber(prevSelected => (prevSelected === number ? null : number));
  };

  // --- MODAL: This now opens the confirmation modal ---
  const handleOpenConfirmation = () => {
    if (selectedNumber === null) {
      setError('Please select a number before submitting.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // --- MODAL: This function handles the actual submission from the modal ---
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const payload = {
        selectedDigit: selectedNumber,
        timestamp: new Date().toISOString(),
      };
      
      console.log('API Request Payload:', payload);

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const responseData = await response.json();
      console.log('API Response:', responseData);

      alert(`Successfully submitted number ${selectedNumber}!`);
      setSelectedNumber(null); 

    } catch (apiError) {
      console.error('Submission failed:', apiError);
      setError('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false); // Close the confirmation modal
    }
  };

  return (
    <>
      {/* RESPONSIVE: Added padding for different screen sizes */}
      <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-5xl bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Single Digit Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Adjusted gap for smaller screens */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {numbers.map((number) => {
                const isSelected = selectedNumber === number;
                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleSelectNumber(number)}
                    className={cn(
                      // RESPONSIVE: Slightly smaller buttons on mobile
                      "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl font-medium border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      isSelected
                        ? "bg-green-600 text-white border-green-700 ring-green-500 shadow-lg"
                        : "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5] hover:border-[#a0d9d1]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {number}
                  </button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="pt-8">
            {/* RESPONSIVE: Full width on mobile, auto on larger screens */}
            <Button 
              onClick={handleOpenConfirmation} 
              disabled={isSubmitting || selectedNumber === null}
              className="w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Selection
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* --- MODAL: Confirmation Dialog --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Selection</DialogTitle>
            <DialogDescription>
              You are about to submit the number <strong className="text-2xl text-green-600">{selectedNumber}</strong>. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* --- MODAL: Error Dialog --- */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription className="pt-2">{error}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SingleDigit;