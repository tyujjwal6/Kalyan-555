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

// Data for the 'Open Ank' section
const openAnks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Data for the 'Close Ank' grid
const closeAnksData = [
  { value: '000', display: ['00', '0'] }, { value: '100', display: ['100'] }, { value: '110', display: ['110'] }, { value: '111', display: ['111'] }, { value: '112', display: ['112'] }, { value: '113', display: ['113'] }, { value: '114', display: ['114'] }, { value: '115', display: ['115'] }, { value: '116', display: ['116'] }, { value: '117', display: ['117'] }, { value: '118', display: ['118'] }, { value: '119', display: ['119'] }, { value: '120', display: ['120'] }, { value: '122', display: ['122'] }, { value: '123', display: ['123'] }, { value: '124', display: ['124'] }, { value: '125', display: ['125'] }, { value: '126', display: ['126'] }, { value: '127', display: ['127'] }, { value: '128', display: ['128'] }, { value: '129', display: ['129'] }, { value: '130', display: ['130'] }, { value: '133', display: ['133'] }, { value: '134', display: ['134'] }, { value: '135', display: ['135'] }, { value: '136', display: ['136'] }, { value: '137', display: ['137'] }, { value: '138', display: ['138'] }, { value: '139', display: ['139'] }, { value: '140', display: ['140'] }, { value: '144', display: ['144'] }, { value: '145', display: ['145'] }, { value: '146', display: ['146'] }, { value: '147', display: ['147'] }, { value: '148', display: ['148'] }, { value: '149', display: ['149'] }, { value: '150', display: ['150'] }, { value: '155', display: ['155'] }, { value: '156', display: ['156'] }, { value: '157', display: ['157'] }, { value: '158', display: ['158'] }, { value: '159', display: ['159'] }, { value: '160', display: ['160'] }, { value: '166', display: ['166'] }, { value: '167', display: ['167'] }, { value: '168', display: ['168'] }, { value: '169', display: ['169'] }, { value: '170', display: ['170'] }, { value: '177', display: ['177'] }, { value: '178', display: ['178'] }, { value: '179', display: ['179'] }, { value: '180', display: ['180'] }, { value: '188', display: ['188'] }, { value: '189', display: ['189'] }, { value: '190', display: ['190'] }, { value: '199', display: ['199'] }, { value: '200', display: ['200'] }, { value: '220', display: ['220'] }, { value: '222', display: ['222'] }, { value: '223', display: ['223'] }, { value: '224', display: ['224'] }, { value: '225', display: ['225'] }, { value: '226', display: ['226'] }, { value: '227', display: ['227'] }, { value: '228', display: ['228'] }, { value: '229', display: ['229'] }, { value: '230', display: ['230'] }, { value: '233', display: ['233'] }, { value: '234', display: ['234'] }, { value: '235', display: ['235'] }, { value: '236', display: ['236'] }, { value: '237', display: ['237'] }, { value: '238', display: ['238'] }, { value: '239', display: ['239'] }, { value: '240', display: ['24', '0'] }, { value: '244', display: ['24', '4'] }, { value: '245', display: ['24', '5'] }, { value: '246', display: ['24', '6'] }, { value: '247', display: ['247'] }, { value: '248', display: ['24', '8'] }, { value: '249', display: ['249'] }, { value: '250', display: ['250'] }, { value: '255', display: ['255'] }, { value: '256', display: ['256'] }, { value: '257', display: ['257'] }, { value: '258', display: ['258'] }, { value: '259', display: ['259'] }, { value: '260', display: ['260'] }, { value: '266', display: ['266'] }, { value: '267', display: ['267'] }, { value: '268', display: ['268'] }, { value: '269', display: ['269'] }, { value: '270', display: ['270'] }, { value: '277', display: ['277'] }, { value: '278', display: ['278'] }, { value: '279', display: ['279'] }, { value: '280', display: ['280'] }, { value: '288', display: ['288'] }, { value: '289', display: ['289'] }, { value: '290', display: ['290'] }, { value: '299', display: ['299'] }, { value: '300', display: ['30', '0'] }, { value: '330', display: ['330'] }, { value: '333', display: ['333'] }, { value: '334', display: ['334'] }, { value: '335', display: ['335'] }, { value: '336', display: ['336'] }, { value: '337', display: ['337'] }, { value: '338', display: ['338'] }, { value: '339', display: ['339'] }, { value: '340', display: ['34', '0'] }, { value: '344', display: ['34', '4'] }, { value: '345', display: ['34', '5'] }, { value: '346', display: ['34', '6'] }, { value: '347', display: ['347'] }, { value: '348', display: ['34', '8'] }, { value: '349', display: ['34', '9'] }, { value: '350', display: ['35', '0'] }, { value: '355', display: ['35', '5'] }, { value: '356', display: ['35', '6'] }, { value: '357', display: ['357'] }, { value: '358', display: ['35', '8'] }, { value: '359', display: ['359'] }, { value: '360', display: ['36', '0'] }, { value: '366', display: ['36', '6'] }, { value: '367', display: ['367'] }, { value: '368', display: ['36', '8'] }, { value: '369', display: ['369'] }, { value: '370', display: ['370'] }, { value: '377', display: ['377'] }, { value: '378', display: ['378'] }, { value: '379', display: ['379'] }, { value: '380', display: ['38', '0'] }, { value: '388', display: ['38', '8'] }, { value: '389', display: ['389'] }, { value: '390', display: ['390'] }, { value: '399', display: ['399'] }, { value: '400', display: ['40', '0'] }, { value: '440', display: ['44', '0'] }, { value: '444', display: ['44', '4'] }, { value: '445', display: ['44', '5'] }, { value: '446', display: ['44', '6'] }, { value: '447', display: ['447'] }, { value: '448', display: ['44', '8'] }, { value: '449', display: ['44', '9'] }, { value: '450', display: ['45', '0'] }, { value: '455', display: ['45', '5'] }, { value: '456', display: ['45', '6'] }, { value: '457', display: ['457'] }, { value: '458', display: ['45', '8'] }, { value: '459', display: ['45', '9'] }, { value: '460', display: ['46', '0'] }, { value: '466', display: ['46', '6'] }, { value: '467', display: ['467'] }, { value: '468', display: ['46', '8'] }, { value: '469', display: ['46', '9'] }, { value: '470', display: ['470'] }, { value: '477', display: ['477'] }, { value: '478', display: ['478'] }, { value: '479', display: ['479'] }, { value: '480', display: ['48', '0'] }, { value: '488', display: ['48', '8'] }, { value: '489', display: ['48', '9'] }, { value: '490', display: ['49', '0'] }, { value: '500', display: ['50', '0'] }, { value: '550', display: ['55', '0'] }, { value: '555', display: ['55', '5'] }, { value: '556', display: ['55', '6'] }, { value: '557', display: ['557'] }, { value: '558', display: ['55', '8'] }, { value: '559', display: ['55', '9'] }, { value: '560', display: ['56', '0'] }, { value: '566', display: ['56', '6'] }, { value: '567', display: ['567'] }, { value: '568', display: ['56', '8'] }, { value: '569', display: ['56', '9'] }, { value: '570', display: ['570'] }, { value: '577', display: ['577'] }, { value: '578', display: ['578'] }, { value: '579', display: ['579'] }, { value: '580', display: ['58', '0'] }, { value: '588', display: ['58', '8'] }, { value: '590', display: ['59', '0'] }, { value: '599', display: ['59', '9'] }, { value: '600', display: ['60', '0'] }, { value: '660', display: ['66', '0'] }, { value: '666', display: ['66', '6'] }, { value: '667', display: ['667'] }, { value: '668', display: ['66', '8'] }, { value: '669', display: ['66', '9'] }, { value: '670', display: ['670'] }, { value: '677', display: ['677'] }, { value: '678', display: ['678'] }, { value: '679', display: ['679'] }, { value: '680', display: ['68', '0'] }, { value: '688', display: ['68', '8'] }, { value: '689', display: ['68', '9'] }, { value: '690', display: ['69', '0'] }, { value: '699', display: ['69', '9'] }, { value: '700', display: ['700'] }, { value: '770', display: ['770'] }, { value: '777', display: ['777'] }, { value: '778', display: ['778'] }, { value: '779', display: ['779'] }, { value: '780', display: ['780'] }, { value: '799', display: ['799'] }, { value: '800', display: ['80', '0'] }, { value: '880', display: ['88', '0'] }, { value: '899', display: ['89', '9'] }, { value: '900', display: ['90', '0'] }, { value: '990', display: ['99', '0'] }, { value: '999', display: ['99', '9'] },
];

// FIX: Centralized button styles for cleanliness
const baseButtonStyles = "flex items-center justify-center border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
const selectedButtonStyles = "bg-green-600 text-white border-green-700 ring-green-500 shadow-lg";
const unselectedButtonStyles = "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5]";

const HalfSangam = () => {
  const [selectedOpenAnk, setSelectedOpenAnk] = useState(null);
  const [selectedCloseAnks, setSelectedCloseAnks] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectOpenAnk = (ank) => { setSelectedOpenAnk(prev => (prev === ank ? null : ank)); };
  const handleSelectCloseAnk = (panaValue) => { setSelectedCloseAnks(prev => prev.includes(panaValue) ? prev.filter(p => p !== panaValue) : [...prev, panaValue]); };

  const handleOpenConfirmation = () => {
    if (selectedOpenAnk === null || selectedCloseAnks.length === 0) {
      setError('Please select one Open Ank and at least one Close Ank.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = { openAnk: selectedOpenAnk, closeAnks: selectedCloseAnks, timestamp: new Date().toISOString() };
      console.log('API Request Payload:', payload);
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      console.log('API Response: Success');
      alert('Selection submitted successfully!');
      setSelectedOpenAnk(null);
      setSelectedCloseAnks([]);
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
      <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-screen-xl bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Half Sangam Numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Open Ank Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Open Ank</h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {openAnks.map((ank) => {
                  const isSelected = selectedOpenAnk === ank;
                  return (
                    <button key={ank} type="button" onClick={() => handleSelectOpenAnk(ank)}
                      className={cn(baseButtonStyles, "w-14 h-12 sm:w-16", isSelected ? selectedButtonStyles : unselectedButtonStyles)}
                      aria-pressed={isSelected}
                    ><span className="text-lg font-medium">{ank}</span></button>
                  );
                })}
              </div>
            </div>

            {/* Close Ank Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Close Ank</h3>
              {/* FIX: Adjusted grid columns for better responsiveness */}
              <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-22 gap-2 sm:gap-3">
                {closeAnksData.map((pana) => {
                  const isSelected = selectedCloseAnks.includes(pana.value);
                  return (
                    // FIX: Using aspect-square to make buttons responsive
                    <button key={pana.value} type="button" onClick={() => handleSelectCloseAnk(pana.value)}
                      className={cn(baseButtonStyles, "w-full aspect-square", isSelected ? selectedButtonStyles : unselectedButtonStyles)}
                      aria-pressed={isSelected}
                    >
                      {pana.display.length === 1 ? (
                        // FIX: Standardized font size
                        <span className="text-sm font-medium">{pana.display[0]}</span>
                      ) : (
                        // FIX: Adjusted font sizes and used a negative margin for better vertical alignment
                        <div className="flex flex-col items-center justify-center leading-tight">
                          <span className="text-sm font-medium">{pana.display[0]}</span>
                          <span className="text-xs font-medium -mt-1">{pana.display[1]}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button onClick={handleOpenConfirmation} disabled={isSubmitting || selectedOpenAnk === null || selectedCloseAnks.length === 0} className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" />
              Submit Selection
            </Button>
            <div className="text-sm text-gray-600 h-5 text-right flex-grow">
              {selectedOpenAnk !== null && <span>Open Ank: <Badge>{selectedOpenAnk}</Badge></span>}
              {selectedCloseAnks.length > 0 && <span className="ml-4">Close Anks: <Badge>{selectedCloseAnks.length}</Badge></span>}
            </div>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Selection</DialogTitle>
            <DialogDescription>You are about to submit the following combination. Please review it carefully.</DialogDescription>
          </DialogHeader>
          <div className="my-4 space-y-4">
            <div><h4 className="font-semibold mb-2">Open Ank:</h4><Badge className="text-lg">{selectedOpenAnk}</Badge></div>
            <div>
                <h4 className="font-semibold mb-2">Close Anks ({selectedCloseAnks.length}):</h4>
                <div className="my-2 rounded-lg border max-h-32 overflow-y-auto p-2">
                    <div className="flex flex-wrap gap-2">{selectedCloseAnks.map(num => (<Badge key={num} variant="secondary">{num}</Badge>))}</div>
                </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="text-red-600">Action Required</DialogTitle><DialogDescription className="pt-2">{error}</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button type="button">OK</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HalfSangam;