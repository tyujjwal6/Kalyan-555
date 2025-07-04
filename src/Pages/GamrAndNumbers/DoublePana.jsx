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

// Data is structured to perfectly match the image.
const panaData = [
  { ank: '0', panas: [ { value: '550', display: ['55', '0'] }, { value: '668', display: ['66', '8'] }, { value: '244', display: ['24', '4'] }, { value: '299', display: ['29', '9'] }, { value: '226', display: ['22', '6'] }, { value: '488', display: ['48', '8'] }, { value: '677', display: ['67', '7'] }, { value: '118', display: ['118'] }, { value: '334', display: ['33', '4'] } ] },
  { ank: '1', panas: [ { value: '100', display: ['100'] }, { value: '119', display: ['119'] }, { value: '155', display: ['155'] }, { value: '227', display: ['227'] }, { value: '335', display: ['33', '5'] }, { value: '344', display: ['34', '4'] }, { value: '399', display: ['39', '9'] }, { value: '588', display: ['58', '8'] }, { value: '669', display: ['66', '9'] } ] },
  { ank: '2', panas: [ { value: '200', display: ['20', '0'] }, { value: '110', display: ['110'] }, { value: '228', display: ['22', '8'] }, { value: '255', display: ['25', '5'] }, { value: '336', display: ['33', '6'] }, { value: '499', display: ['49', '9'] }, { value: '660', display: ['66', '0'] }, { value: '688', display: ['68', '8'] }, { value: '778', display: ['77', '8'] } ] },
  { ank: '3', panas: [ { value: '300', display: ['30', '0'] }, { value: '166', display: ['166'] }, { value: '229', display: ['22', '9'] }, { value: '337', display: ['33', '7'] }, { value: '355', display: ['35', '5'] }, { value: '445', display: ['44', '5'] }, { value: '599', display: ['59', '9'] }, { value: '779', display: ['77', '9'] }, { value: '788', display: ['78', '8'] } ] },
  { ank: '4', panas: [ { value: '400', display: ['40', '0'] }, { value: '112', display: ['112'] }, { value: '220', display: ['22', '0'] }, { value: '266', display: ['26', '6'] }, { value: '338', display: ['33', '8'] }, { value: '446', display: ['44', '6'] }, { value: '455', display: ['45', '5'] }, { value: '699', display: ['69', '9'] }, { value: '770', display: ['77', '0'] } ] },
  { ank: '5', panas: [ { value: '500', display: ['50', '0'] }, { value: '113', display: ['113'] }, { value: '122', display: ['122'] }, { value: '177', display: ['177'] }, { value: '339', display: ['33', '9'] }, { value: '366', display: ['36', '6'] }, { value: '447', display: ['44', '7'] }, { value: '799', display: ['79', '9'] }, { value: '889', display: ['88', '9'] } ] },
  { ank: '6', panas: [ { value: '600', display: ['60', '0'] }, { value: '114', display: ['114'] }, { value: '277', display: ['277'] }, { value: '330', display: ['33', '0'] }, { value: '448', display: ['44', '8'] }, { value: '466', display: ['46', '6'] }, { value: '556', display: ['55', '6'] }, { value: '880', display: ['88', '0'] }, { value: '899', display: ['89', '9'] } ] },
  { ank: '7', panas: [ { value: '700', display: ['70', '0'] }, { value: '115', display: ['115'] }, { value: '133', display: ['133'] }, { value: '188', display: ['188'] }, { value: '223', display: ['22', '3'] }, { value: '377', display: ['377'] }, { value: '449', display: ['44', '9'] }, { value: '557', display: ['55', '7'] }, { value: '566', display: ['56', '6'] } ] },
  { ank: '8', panas: [ { value: '800', display: ['80', '0'] }, { value: '116', display: ['116'] }, { value: '224', display: ['22', '4'] }, { value: '233', display: ['23', '3'] }, { value: '288', display: ['28', '8'] }, { value: '440', display: ['44', '0'] }, { value: '477', display: ['47', '7'] }, { value: '558', display: ['55', '8'] }, { value: '990', display: ['99', '0'] } ] },
  { ank: '9', panas: [ { value: '900', display: ['90', '0'] }, { value: '117', display: ['117'] }, { value: '144', display: ['144'] }, { value: '199', display: ['199'] }, { value: '225', display: ['22', '5'] }, { value: '388', display: ['38', '8'] }, { value: '559', display: ['55', '9'] }, { value: '677', display: ['67', '7'] }, { value: '667', display: ['66', '7'] } ] },
];


const DoublePana = () => {
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
        selectedDoublePanas: selectedPanas,
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
        <Card className="w-full max-w-7xl bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Double Pana Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {panaData.map(({ ank, panas }) => (
                <div key={ank}>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Single Ank</h3>
                    <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-red-600 bg-red-50 border-2 border-red-400 rounded-md">
                      {ank}
                    </div>
                  </div>
                  {/* RESPONSIVE: Adjusted gap for smaller screens */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {panas.map((pana) => {
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
                </div>
              ))}
            </div>
          </CardContent>
          {/* RESPONSIVE: Stacks on mobile, horizontal on larger screens */}
          <CardFooter className="pt-10 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

export default DoublePana;