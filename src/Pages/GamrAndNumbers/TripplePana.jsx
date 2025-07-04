import React, { useState } from 'react';
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

// Data structured to match the image
const tripplePanaData = [
  { value: '000', display: ['00', '0'] },
  { value: '111', display: ['111'] },
  { value: '222', display: ['222'] },
  { value: '333', display: ['333'] },
  { value: '444', display: ['44', '4'] },
  { value: '555', display: ['55', '5'] },
  { value: '666', display: ['66', '6'] },
  { value: '777', display: ['777'] },
  { value: '888', display: ['88', '8'] },
  { value: '999', display: ['99', '9'] },
];

/**
 * TripplePana Component
 * 
 * Displays a responsive selection of "tripple pana" numbers.
 * Uses a modal-driven workflow for submitting selections.
 */
const TripplePana = () => {
  const [selectedPanas, setSelectedPanas] = useState([]);
  // --- MODAL: State for modals and submission status ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectPana = (panaValue) => {
    setSelectedPanas(prevSelected =>
      prevSelected.includes(panaValue)
        ? prevSelected.filter(p => p !== panaValue)
        : [...prevSelected, panaValue]
    );
  };

  // --- MODAL: This now opens the confirmation modal ---
  const handleOpenConfirmation = () => {
    if (selectedPanas.length === 0) {
      setError('Please select at least one pana before submitting.');
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
        selectedTripplePanas: selectedPanas,
        timestamp: new Date().toISOString(),
      };
      
      console.log('API Request Payload:', payload);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      console.log('API Response: Success');

      alert(`Successfully submitted ${selectedPanas.length} panas!`);
      setSelectedPanas([]);

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
        <Card className="w-full max-w-5xl bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Tripple Pana Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Adjusted gap for better spacing on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {tripplePanaData.map((pana) => {
                const isSelected = selectedPanas.includes(pana.value);
                return (
                  <button
                    key={pana.value}
                    type="button"
                    onClick={() => handleSelectPana(pana.value)}
                    className={cn(
                      // RESPONSIVE: Slightly smaller buttons on mobile
                      "w-16 h-14 sm:w-20 sm:h-16 flex items-center justify-center border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      isSelected
                        ? "bg-green-600 text-white border-green-700 ring-green-500 shadow-lg"
                        : "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5] hover:border-[#a0d9d1]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {pana.display.length === 1 ? (
                      <span className="text-lg sm:text-xl font-medium">{pana.display[0]}</span>
                    ) : (
                      <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="text-md sm:text-lg font-medium">{pana.display[0]}</span>
                        <span className="text-xs sm:text-sm font-medium">{pana.display[1]}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
          {/* RESPONSIVE: Stacks on mobile, horizontal on larger screens */}
          <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button
              onClick={handleOpenConfirmation}
              disabled={isSubmitting || selectedPanas.length === 0}
              className="w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              {`Submit ${selectedPanas.length} Selected`}
            </Button>
            <p className="text-sm text-gray-600 h-5 text-right flex-grow">
              {selectedPanas.length > 0 && `You have selected ${selectedPanas.length} pana(s).`}
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
              You are about to submit {selectedPanas.length} panas. Please review your selection below.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 rounded-lg border max-h-48 overflow-y-auto p-3">
            <div className="flex flex-wrap gap-2">
              {selectedPanas.map(num => (
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

export default TripplePana;