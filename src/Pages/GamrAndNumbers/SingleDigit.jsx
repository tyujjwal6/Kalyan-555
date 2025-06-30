import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from 'lucide-react';

/**
 * SingleDigit Component
 * 
 * Displays a selection of single-digit numbers (0-9).
 * - Allows a user to select a single number.
 * - Clicking the same number again deselects it.
 * - Includes a submit button to send the selected number to a dummy API endpoint.
 * - The submit button is added to fulfill the functional requirement of API interaction,
 *   as the original image does not contain one.
 * - Provides user feedback during and after submission.
 */
const SingleDigit = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSelectNumber = (number) => {
    // If the clicked number is already selected, deselect it. Otherwise, select it.
    setSelectedNumber(prevSelected => (prevSelected === number ? null : number));
  };

  const handleSubmit = async () => {
    if (selectedNumber === null) {
      setFeedbackMessage('Please select a number before submitting.');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(`Submitting number ${selectedNumber}...`);

    try {
      // Prepare the form data for the backend API
      const payload = {
        selectedDigit: selectedNumber,
        timestamp: new Date().toISOString(),
      };

      // Hit a dummy API (JSONPlaceholder is great for this)
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

      setFeedbackMessage(`Successfully submitted number ${selectedNumber}!`);
      // Reset selection after successful submission
      setSelectedNumber(null); 

    } catch (error) {
      console.error('Submission failed:', error);
      setFeedbackMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear the message after a few seconds
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full flex items-start justify-center p-4 sm:p-8">
      <Card className="w-full max-w-5xl bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Single Digit Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-6">
            {numbers.map((number) => {
              const isSelected = selectedNumber === number;
              return (
                <button
                  key={number}
                  type="button"
                  onClick={() => handleSelectNumber(number)}
                  className={cn(
                    "w-16 h-16 flex items-center justify-center text-xl font-medium border rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
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
        {/* This footer is added to provide the submission functionality as requested. */}
        <CardFooter className="pt-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || selectedNumber === null}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Selection'}
          </Button>
          {feedbackMessage && (
            <p className="text-sm text-gray-600 h-5">
              {feedbackMessage}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleDigit;