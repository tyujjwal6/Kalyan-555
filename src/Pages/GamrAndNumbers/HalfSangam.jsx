import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from 'lucide-react';

// Data for the 'Open Ank' section
const openAnks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Data for the 'Close Ank' grid, structured for complex display logic
const closeAnksData = [
  { value: '000', display: ['00', '0'] }, { value: '100', display: ['100'] }, { value: '110', display: ['110'] },
  { value: '111', display: ['111'] }, { value: '112', display: ['112'] }, { value: '113', display: ['113'] },
  { value: '114', display: ['114'] }, { value: '115', display: ['115'] }, { value: '116', display: ['116'] },
  { value: '117', display: ['117'] }, { value: '118', display: ['118'] }, { value: '119', display: ['119'] },
  { value: '120', display: ['120'] }, { value: '122', display: ['122'] }, { value: '123', display: ['123'] },
  { value: '124', display: ['124'] }, { value: '125', display: ['125'] }, { value: '126', display: ['126'] },
  { value: '127', display: ['127'] }, { value: '128', display: ['128'] }, { value: '129', display: ['129'] },
  { value: '130', display: ['130'] }, { value: '133', display: ['133'] }, { value: '134', display: ['134'] },
  { value: '135', display: ['135'] }, { value: '136', display: ['136'] }, { value: '137', display: ['137'] },
  { value: '138', display: ['138'] }, { value: '139', display: ['139'] }, { value: '140', display: ['140'] },
  { value: '144', display: ['144'] }, { value: '145', display: ['145'] }, { value: '146', display: ['146'] },
  { value: '147', display: ['147'] }, { value: '148', display: ['148'] }, { value: '149', display: ['149'] },
  { value: '150', display: ['150'] }, { value: '155', display: ['155'] }, { value: '156', display: ['156'] },
  { value: '157', display: ['157'] }, { value: '158', display: ['158'] }, { value: '159', display: ['159'] },
  { value: '160', display: ['160'] }, { value: '166', display: ['166'] }, { value: '167', display: ['167'] },
  { value: '168', display: ['168'] }, { value: '169', display: ['169'] }, { value: '170', display: ['170'] },
  { value: '177', display: ['177'] }, { value: '178', display: ['178'] }, { value: '179', display: ['179'] },
  { value: '180', display: ['180'] }, { value: '188', display: ['188'] }, { value: '189', display: ['189'] },
  { value: '190', display: ['190'] }, { value: '199', display: ['199'] }, { value: '200', display: ['200'] },
  { value: '220', display: ['220'] }, { value: '222', display: ['222'] }, { value: '223', display: ['223'] },
  { value: '224', display: ['224'] }, { value: '225', display: ['225'] }, { value: '226', display: ['226'] },
  { value: '227', display: ['227'] }, { value: '228', display: ['228'] }, { value: '229', display: ['229'] },
  { value: '230', display: ['230'] }, { value: '233', display: ['233'] }, { value: '234', display: ['234'] },
  { value: '235', display: ['235'] }, { value: '236', display: ['236'] }, { value: '237', display: ['237'] },
  { value: '238', display: ['238'] }, { value: '239', display: ['239'] }, { value: '240', display: ['24', '0'] },
  { value: '244', display: ['24', '4'] }, { value: '245', display: ['24', '5'] }, { value: '246', display: ['24', '6'] },
  { value: '247', display: ['247'] }, { value: '248', display: ['24', '8'] }, { value: '249', display: ['249'] },
  { value: '250', display: ['250'] }, { value: '255', display: ['255'] }, { value: '256', display: ['256'] },
  { value: '257', display: ['257'] }, { value: '258', display: ['258'] }, { value: '259', display: ['259'] },
  { value: '260', display: ['260'] }, { value: '266', display: ['266'] }, { value: '267', display: ['267'] },
  { value: '268', display: ['268'] }, { value: '269', display: ['269'] }, { value: '270', display: ['270'] },
  { value: '277', display: ['277'] }, { value: '278', display: ['278'] }, { value: '279', display: ['279'] },
  { value: '280', display: ['280'] }, { value: '288', display: ['288'] }, { value: '289', display: ['289'] },
  { value: '290', display: ['290'] }, { value: '291', display: ['291'] }, { value: '292', display: ['292'] },
  { value: '293', display: ['293'] }, { value: '294', display: ['294'] }, { value: '295', display: ['295'] },
  { value: '296', display: ['296'] }, { value: '297', display: ['297'] }, { value: '298', display: ['298'] },
  { value: '299', display: ['299'] }, { value: '300', display: ['30', '0'] }, { value: '330', display: ['330'] },
  { value: '333', display: ['333'] }, { value: '334', display: ['334'] }, { value: '335', display: ['335'] },
  { value: '336', display: ['336'] }, { value: '337', display: ['337'] }, { value: '338', display: ['338'] },
  { value: '339', display: ['339'] }, { value: '340', display: ['34', '0'] }, { value: '344', display: ['34', '4'] },
  { value: '345', display: ['34', '5'] }, { value: '346', display: ['34', '6'] }, { value: '347', display: ['347'] },
  { value: '348', display: ['34', '8'] }, { value: '349', display: ['34', '9'] }, { value: '350', display: ['35', '0'] },
  { value: '355', display: ['35', '5'] }, { value: '356', display: ['35', '6'] }, { value: '357', display: ['357'] },
  { value: '358', display: ['35', '8'] }, { value: '359', display: ['359'] }, { value: '360', display: ['36', '0'] },
  { value: '366', display: ['36', '6'] }, { value: '367', display: ['367'] }, { value: '368', display: ['36', '8'] },
  { value: '369', display: ['369'] }, { value: '370', display: ['370'] }, { value: '377', display: ['377'] },
  { value: '378', display: ['378'] }, { value: '379', display: ['379'] }, { value: '380', display: ['38', '0'] },
  { value: '388', display: ['38', '8'] }, { value: '389', display: ['389'] }, { value: '390', display: ['390'] },
  { value: '399', display: ['399'] }, { value: '400', display: ['40', '0'] }, { value: '440', display: ['44', '0'] },
  { value: '444', display: ['44', '4'] }, { value: '445', display: ['44', '5'] }, { value: '446', display: ['44', '6'] },
  { value: '447', display: ['447'] }, { value: '448', display: ['44', '8'] }, { value: '449', display: ['44', '9'] },
  { value: '450', display: ['45', '0'] }, { value: '455', display: ['45', '5'] }, { value: '456', display: ['45', '6'] },
  { value: '457', display: ['457'] }, { value: '458', display: ['45', '8'] }, { value: '459', display: ['45', '9'] },
  { value: '460', display: ['46', '0'] }, { value: '466', display: ['46', '6'] }, { value: '467', display: ['467'] },
  { value: '468', display: ['46', '8'] }, { value: '469', display: ['46', '9'] }, { value: '470', display: ['470'] },
  { value: '477', display: ['477'] }, { value: '478', display: ['478'] }, { value: '479', display: ['479'] },
  { value: '480', display: ['48', '0'] }, { value: '488', display: ['48', '8'] }, { value: '489', display: ['48', '9'] },
  { value: '490', display: ['49', '0'] }, { value: '500', display: ['50', '0'] }, { value: '505', display: ['50', '5'] },
  { value: '550', display: ['55', '0'] }, { value: '555', display: ['55', '5'] }, { value: '556', display: ['55', '6'] },
  { value: '557', display: ['557'] }, { value: '558', display: ['55', '8'] }, { value: '559', display: ['55', '9'] },
  { value: '560', display: ['56', '0'] }, { value: '566', display: ['56', '6'] }, { value: '567', display: ['567'] },
  { value: '568', display: ['56', '8'] }, { value: '569', display: ['56', '9'] }, { value: '570', display: ['570'] },
  { value: '577', display: ['577'] }, { value: '578', display: ['578'] }, { value: '579', display: ['579'] },
  { value: '580', display: ['58', '0'] }, { value: '588', display: ['58', '8'] }, { value: '590', display: ['59', '0'] },
  { value: '591', display: ['591'] }, { value: '592', display: ['592'] }, { value: '593', display: ['593'] },
  { value: '594', display: ['59', '4'] }, { value: '595', display: ['59', '5'] }, { value: '596', display: ['59', '6'] },
  { value: '597', display: ['597'] }, { value: '598', display: ['59', '8'] }, { value: '599', display: ['59', '9'] },
  { value: '600', display: ['60', '0'] }, { value: '660', display: ['66', '0'] }, { value: '666', display: ['66', '6'] },
  { value: '667', display: ['667'] }, { value: '668', display: ['66', '8'] }, { value: '669', display: ['66', '9'] },
  { value: '670', display: ['670'] }, { value: '677', display: ['677'] }, { value: '678', display: ['678'] },
  { value: '679', display: ['679'] }, { value: '680', display: ['68', '0'] }, { value: '681', display: ['681'] },
  { value: '682', display: ['682'] }, { value: '683', display: ['68', '3'] }, { value: '684', display: ['68', '4'] },
  { value: '685', display: ['68', '5'] }, { value: '686', display: ['68', '6'] }, { value: '687', display: ['687'] },
  { value: '688', display: ['68', '8'] }, { value: '689', display: ['68', '9'] }, { value: '690', display: ['69', '0'] },
  { value: '699', display: ['69', '9'] }, { value: '700', display: ['700'] }, { value: '770', display: ['770'] },
  { value: '777', display: ['777'] }, { value: '778', display: ['778'] }, { value: '779', display: ['779'] },
  { value: '780', display: ['780'] }, { value: '799', display: ['799'] }, { value: '800', display: ['80', '0'] },
  { value: '880', display: ['88', '0'] }, { value: '899', display: ['89', '9'] }, { value: '900', display: ['90', '0'] },
  { value: '990', display: ['99', '0'] }, { value: '999', display: ['99', '9'] },
];

/**
 * HalfSangam Component
 * 
 * Allows users to select one 'Open Ank' and multiple 'Close Ank' numbers.
 * The selection is then submitted to a backend API.
 */
const HalfSangam = () => {
  const [selectedOpenAnk, setSelectedOpenAnk] = useState(null);
  const [selectedCloseAnks, setSelectedCloseAnks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Handles selection for the 'Open Ank' section (single choice)
  const handleSelectOpenAnk = (ank) => {
    setSelectedOpenAnk(prev => (prev === ank ? null : ank));
  };

  // Handles selection for the 'Close Ank' section (multiple choice)
  const handleSelectCloseAnk = (panaValue) => {
    setSelectedCloseAnks(prev =>
      prev.includes(panaValue)
        ? prev.filter(p => p !== panaValue)
        : [...prev, panaValue]
    );
  };

  // Handles the submission of selected data to a dummy API
  const handleSubmit = async () => {
    if (selectedOpenAnk === null || selectedCloseAnks.length === 0) {
      setFeedbackMessage('Please select one Open Ank and at least one Close Ank.');
      setTimeout(() => setFeedbackMessage(''), 4000);
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('Submitting your selection...');

    try {
      // Format the data payload for the backend
      const payload = {
        openAnk: selectedOpenAnk,
        closeAnks: selectedCloseAnks,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const responseData = await response.json();
      console.log('API Response:', responseData);

      setFeedbackMessage('Selection submitted successfully!');
      // Reset selections after successful submission
      setSelectedOpenAnk(null);
      setSelectedCloseAnks([]);

    } catch (error) {
      console.error('Submission failed:', error);
      setFeedbackMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-8">
      <Card className="w-full max-w-screen-2xl bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Half Sangam Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Open Ank Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Open Ank</h3>
            <div className="flex flex-wrap items-center gap-4">
              {openAnks.map((ank) => {
                const isSelected = selectedOpenAnk === ank;
                return (
                  <button
                    key={ank}
                    type="button"
                    onClick={() => handleSelectOpenAnk(ank)}
                    className={cn(
                      "w-16 h-12 flex items-center justify-center text-lg font-medium border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105",
                      isSelected
                        ? "bg-green-600 text-white border-green-700 ring-2 ring-green-500 shadow-lg"
                        : "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {ank}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Close Ank Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Close Ank</h3>
            <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-22 gap-3">
              {closeAnksData.map((pana) => {
                const isSelected = selectedCloseAnks.includes(pana.value);
                return (
                  <button
                    key={pana.value}
                    type="button"
                    onClick={() => handleSelectCloseAnk(pana.value)}
                    className={cn(
                      "w-full h-12 flex items-center justify-center border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105",
                      isSelected
                        ? "bg-green-600 text-white border-green-700 ring-2 ring-green-500 shadow-lg"
                        : "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {pana.display.length === 1 ? (
                      <span className="text-base font-medium">{pana.display[0]}</span>
                    ) : (
                      <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="text-sm font-medium">{pana.display[0]}</span>
                        <span className="text-xs font-medium">{pana.display[1]}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedOpenAnk === null || selectedCloseAnks.length === 0}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Selection'}
          </Button>
          {feedbackMessage && (
            <p className="text-sm text-gray-600 h-5 text-right flex-grow">
              {feedbackMessage}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default HalfSangam;