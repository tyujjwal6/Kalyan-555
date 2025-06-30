import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from 'lucide-react';

// Data structured to match the image, with a `value` for the backend
// and a `display` array to control the visual rendering.
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
 * Displays a selection of "tripple pana" numbers.
 * - Allows users to select multiple numbers.
 * - Renders numbers in single-line or two-line formats.
 * - Provides a submit button to send selected data to a dummy API.
 * - Formats data for easy backend integration.
 */
const TripplePana = () => {
  const [selectedPanas, setSelectedPanas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Toggles the selection status of a given pana number
  const handleSelectPana = (panaValue) => {
    setSelectedPanas(prevSelected =>
      prevSelected.includes(panaValue)
        ? prevSelected.filter(p => p !== panaValue) // Deselect if already present
        : [...prevSelected, panaValue] // Select if not present
    );
  };

  // Handles the form submission to a dummy API
  const handleSubmit = async () => {
    if (selectedPanas.length === 0) {
      setFeedbackMessage('Please select at least one pana before submitting.');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(`Submitting ${selectedPanas.length} panas...`);

    try {
      // Structure the payload for the backend
      const payload = {
        selectedTripplePanas: selectedPanas,
        timestamp: new Date().toISOString(),
      };

      // Hit a dummy API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const responseData = await response.json();
      console.log('API Response:', responseData);

      setFeedbackMessage(`Successfully submitted ${selectedPanas.length} panas!`);
      setSelectedPanas([]); // Clear selection upon success

    } catch (error) {
      console.error('Submission failed:', error);
      setFeedbackMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear the feedback message after 5 seconds
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-8">
      <Card className="w-full max-w-5xl bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Tripple Pana Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-6">
            {tripplePanaData.map((pana) => {
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
        </CardContent>
        {/* The footer is added to provide submission functionality */}
        <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

export default TripplePana;