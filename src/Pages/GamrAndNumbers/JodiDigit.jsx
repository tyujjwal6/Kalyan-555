import React, { useState, useMemo } from 'react';
import { cn } from "@/lib/utils";
import { Send, Loader2 } from 'lucide-react';

// Import necessary components from your shadcn/ui setup
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
 * JodiDigit Component
 * 
 * Displays a responsive grid of two-digit numbers (00-99).
 * - Allows a user to select multiple numbers.
 * - Clicking a number toggles its selection state.
 * - Uses a modal-driven workflow for submitting the selection.
 * - Provides clear user feedback for validation, loading, and success states.
 */
const JodiDigit = () => {
  // State for managing the list of selected numbers
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  
  // --- MODAL: State for modals and submission status ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Generate numbers from "00" to "99".
  const numbers = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));
  }, []);

  // Handler for selecting/deselecting a number
  const handleSelectNumber = (number) => {
    setSelectedNumbers(prevSelected => 
      prevSelected.includes(number)
        ? prevSelected.filter(n => n !== number)
        : [...prevSelected, number]
    );
  };
  
  // --- MODAL: This now opens the confirmation modal ---
  const handleOpenConfirmation = () => {
    if (selectedNumbers.length === 0) {
      setError('Please select at least one number before submitting.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // --- MODAL: This function handles the actual submission from the modal ---
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        selectedJodiDigits: selectedNumbers,
        timestamp: new Date().toISOString(),
      };
      
      console.log('API Request Payload:', payload);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      console.log('API Response: Success');

      alert(`Successfully submitted: ${selectedNumbers.join(', ')}`);
      setSelectedNumbers([]);

    } catch (apiError) {
      console.error('Submission failed:', apiError);
      setError('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <>
      {/* RESPONSIVE: Added padding for different screen sizes */}
      <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-7xl bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Jodi Digit Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Grid adjusts from 5 to 10 columns based on screen size */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
              {numbers.map((number) => {
                const isSelected = selectedNumbers.includes(number);
                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleSelectNumber(number)}
                    className={cn(
                      "aspect-square flex items-center justify-center text-sm sm:text-base font-medium border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
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
          
          {/* RESPONSIVE: Stacks on mobile, horizontal on larger screens */}
          <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button 
              onClick={handleOpenConfirmation} 
              disabled={isSubmitting || selectedNumbers.length === 0}
              className="w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              {`Submit ${selectedNumbers.length} Selected`}
            </Button>
            <p className="text-sm text-gray-600 h-5 text-right flex-grow">
              {selectedNumbers.length > 0 && `You have selected ${selectedNumbers.length} number(s).`}
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* --- MODAL: Confirmation Dialog --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Selection</DialogTitle>
            <DialogDescription>
              You are about to submit {selectedNumbers.length} numbers. Please review your selection.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 rounded-lg border max-h-48 overflow-y-auto p-3">
            <div className="flex flex-wrap gap-2">
              {selectedNumbers.map(num => (
                <Badge key={num} variant="secondary">{num}</Badge>
              ))}
            </div>
          </div>
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

export default JodiDigit;