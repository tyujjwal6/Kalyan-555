import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from 'lucide-react';

/**
 * JodiDigit Component
 * 
 * Displays a responsive grid of two-digit numbers (00-99).
 * - Allows a user to select multiple numbers.
 * - Clicking a number toggles its selection state.
 * - Includes a submit button to send the array of selected numbers to a dummy API.
 * - The submit button is added to fulfill the functional requirement of API interaction.
 * - Provides user feedback during and after the submission process.
 */
const JodiDigit = () => {
  // State for managing the list of selected numbers
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  // State for tracking submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for user feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Generate numbers from "00" to "99".
  // `useMemo` prevents this array from being recalculated on every render.
  const numbers = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));
  }, []);

  // Handler for selecting/deselecting a number
  const handleSelectNumber = (number) => {
    setSelectedNumbers(prevSelected => {
      // Check if the number is already selected
      if (prevSelected.includes(number)) {
        // If yes, filter it out (deselect)
        return prevSelected.filter(n => n !== number);
      } else {
        // If no, add it to the selection
        return [...prevSelected, number];
      }
    });
  };

  // Handler for submitting the selected numbers to a dummy API
  const handleSubmit = async () => {
    if (selectedNumbers.length === 0) {
      setFeedbackMessage('Please select at least one number before submitting.');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(`Submitting ${selectedNumbers.length} numbers...`);

    try {
      // Format the data in a structure suitable for a backend API
      const payload = {
        selectedJodiDigits: selectedNumbers,
        timestamp: new Date().toISOString(),
      };

      // Hit a dummy API endpoint (JSONPlaceholder is used for this example)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);

      setFeedbackMessage(`Successfully submitted: ${selectedNumbers.join(', ')}`);
      // Clear the selection after a successful submission
      setSelectedNumbers([]);

    } catch (error) {
      console.error('Submission failed:', error);
      setFeedbackMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear the feedback message after a few seconds
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-8">
      <Card className="w-full max-w-7xl bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Jodi Digit Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Responsive grid for the numbers */}
          <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-21 gap-3 sm:gap-4">
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
        
        {/* Footer with submit button and feedback area, added per functional requirements */}
        <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || selectedNumbers.length === 0}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : `Submit ${selectedNumbers.length} Selected`}
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

export default JodiDigit;