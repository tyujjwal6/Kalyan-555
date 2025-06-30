import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from 'lucide-react';

// Data structured to match the image, including the custom two-line display.
// The `value` is the actual 3-digit number, and `display` dictates how it's rendered.
const panaData = [
  { ank: '0', panas: [ { value: '127', display: ['127'] }, { value: '136', display: ['136'] }, { value: '145', display: ['145'] }, { value: '190', display: ['190'] }, { value: '235', display: ['23', '5'] }, { value: '280', display: ['28', '0'] }, { value: '370', display: ['37', '0'] }, { value: '460', display: ['46', '0'] }, { value: '569', display: ['56', '9'] }, { value: '578', display: ['57', '8'] } ] },
  { ank: '1', panas: [ { value: '128', display: ['128'] }, { value: '137', display: ['137'] }, { value: '146', display: ['146'] }, { value: '236', display: ['23', '6'] }, { value: '245', display: ['24', '5'] }, { value: '290', display: ['29', '0'] }, { value: '380', display: ['38', '0'] }, { value: '470', display: ['47', '0'] }, { value: '560', display: ['56', '0'] }, { value: '678', display: ['67', '8'] }, { value: '579', display: ['57', '9'] } ] },
  { ank: '2', panas: [ { value: '129', display: ['129'] }, { value: '138', display: ['138'] }, { value: '147', display: ['147'] }, { value: '156', display: ['156'] }, { value: '237', display: ['23', '7'] }, { value: '246', display: ['24', '6'] }, { value: '345', display: ['34', '5'] }, { value: '390', display: ['39', '0'] }, { value: '480', display: ['48', '0'] }, { value: '570', display: ['57', '0'] }, { value: '679', display: ['67', '9'] }, { value: '589', display: ['58', '9'] } ] },
  { ank: '3', panas: [ { value: '120', display: ['120'] }, { value: '139', display: ['139'] }, { value: '148', display: ['148'] }, { value: '157', display: ['157'] }, { value: '238', display: ['23', '8'] }, { value: '247', display: ['24', '7'] }, { value: '256', display: ['25', '6'] }, { value: '346', display: ['34', '6'] }, { value: '490', display: ['49', '0'] }, { value: '580', display: ['58', '0'] }, { value: '670', display: ['67', '0'] }, { value: '689', display: ['68', '9'] } ] },
  { ank: '4', panas: [ { value: '130', display: ['130'] }, { value: '149', display: ['149'] }, { value: '158', display: ['158'] }, { value: '167', display: ['167'] }, { value: '239', display: ['23', '9'] }, { value: '248', display: ['24', '8'] }, { value: '257', display: ['25', '7'] }, { value: '347', display: ['34', '7'] }, { value: '356', display: ['35', '6'] }, { value: '590', display: ['59', '0'] }, { value: '680', display: ['68', '0'] }, { value: '789', display: ['78', '9'] } ] },
  { ank: '5', panas: [ { value: '140', display: ['140'] }, { value: '159', display: ['159'] }, { value: '168', display: ['168'] }, { value: '230', display: ['23', '0'] }, { value: '249', display: ['24', '9'] }, { value: '258', display: ['25', '8'] }, { value: '267', display: ['26', '7'] }, { value: '348', display: ['34', '8'] }, { value: '357', display: ['35', '7'] }, { value: '456', display: ['45', '6'] }, { value: '690', display: ['69', '0'] }, { value: '780', display: ['78', '0'] } ] },
  { ank: '6', panas: [ { value: '123', display: ['123'] }, { value: '150', display: ['150'] }, { value: '169', display: ['169'] }, { value: '178', display: ['178'] }, { value: '240', display: ['24', '0'] }, { value: '259', display: ['25', '9'] }, { value: '268', display: ['26', '8'] }, { value: '349', display: ['34', '9'] }, { value: '358', display: ['35', '8'] }, { value: '457', display: ['45', '7'] }, { value: '367', display: ['36', '7'] }, { value: '790', display: ['79', '0'] } ] },
  { ank: '7', panas: [ { value: '124', display: ['124'] }, { value: '160', display: ['160'] }, { value: '179', display: ['179'] }, { value: '250', display: ['25', '0'] }, { value: '269', display: ['26', '9'] }, { value: '278', display: ['27', '8'] }, { value: '340', display: ['34', '0'] }, { value: '359', display: ['35', '9'] }, { value: '368', display: ['36', '8'] }, { value: '458', display: ['45', '8'] }, { value: '467', display: ['46', '7'] }, { value: '890', display: ['89', '0'] } ] },
  { ank: '8', panas: [ { value: '125', display: ['125'] }, { value: '134', display: ['134'] }, { value: '170', display: ['170'] }, { value: '189', display: ['189'] }, { value: '260', display: ['26', '0'] }, { value: '279', display: ['27', '9'] }, { value: '350', display: ['35', '0'] }, { value: '369', display: ['36', '9'] }, { value: '378', display: ['37', '8'] }, { value: '459', display: ['45', '9'] }, { value: '567', display: ['56', '7'] }, { value: '468', display: ['46', '8'] } ] },
  { ank: '9', panas: [ { value: '126', display: ['126'] }, { value: '135', display: ['135'] }, { value: '180', display: ['180'] }, { value: '234', display: ['23', '4'] }, { value: '270', display: ['27', '0'] }, { value: '289', display: ['28', '9'] }, { value: '360', display: ['36', '0'] }, { value: '379', display: ['37', '9'] }, { value: '450', display: ['45', '0'] }, { value: '469', display: ['46', '9'] }, { value: '478', display: ['47', '8'] }, { value: '568', display: ['56', '8'] } ] },
];


/**
 * SinglePana Component
 * 
 * Displays a list of "pana" numbers, grouped by their "single ank".
 * - Allows users to select multiple pana numbers.
 * - Renders some numbers with a special two-line format.
 * - Provides a submit button to send selected data to a dummy API.
 * - Formats data for easy backend integration.
 */
const SinglePana = () => {
  const [selectedPanas, setSelectedPanas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSelectPana = (panaValue) => {
    setSelectedPanas(prevSelected =>
      prevSelected.includes(panaValue)
        ? prevSelected.filter(p => p !== panaValue)
        : [...prevSelected, panaValue]
    );
  };

  const handleSubmit = async () => {
    if (selectedPanas.length === 0) {
      setFeedbackMessage('Please select at least one pana before submitting.');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(`Submitting ${selectedPanas.length} panas...`);

    try {
      // Format data for backend API
      const payload = {
        selectedSinglePanas: selectedPanas,
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

      setFeedbackMessage(`Successfully submitted ${selectedPanas.length} panas!`);
      setSelectedPanas([]);

    } catch (error) {
      console.error('Submission failed:', error);
      setFeedbackMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-8">
      <Card className="w-full max-w-7xl bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Single Pana Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-10">
            {panaData.map(({ ank, panas }) => (
              <div key={ank}>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-700">Single Ank</h3>
                  <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-red-600 bg-red-50 border-2 border-red-400 rounded-md">
                    {ank}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {panas.map((pana) => {
                    const isSelected = selectedPanas.includes(pana.value);
                    return (
                      <button
                        key={pana.value}
                        type="button"
                        onClick={() => handleSelectPana(pana.value)}
                        className={cn(
                          "w-20 h-16 flex items-center justify-center border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
                          isSelected
                            ? "bg-green-600 text-white border-green-700 ring-green-500 shadow-lg"
                            : "bg-[#e9f7f5] text-slate-800 border-[#b9e7e1] hover:bg-[#d1eae5] hover:border-[#a0d9d1]"
                        )}
                        aria-pressed={isSelected}
                      >
                        {pana.display.length === 1 ? (
                          <span className="text-xl font-medium">{pana.display[0]}</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center leading-tight">
                            <span className="text-lg font-medium">{pana.display[0]}</span>
                            <span className="text-sm font-medium">{pana.display[1]}</span>
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
        <CardFooter className="pt-10 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedPanas.length === 0}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : `Submit ${selectedPanas.length} Selected`}
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

export default SinglePana;