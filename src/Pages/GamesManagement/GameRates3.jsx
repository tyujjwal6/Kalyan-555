import React, { useState } from 'react';

// Import necessary components from your shadcn/ui setup
// The exact path might differ based on your project's configuration
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Initial state for the game rates form, matching the image
const initialRates = {
  singleDigitValue1: '10',
  singleDigitValue2: '100',
  jodiDigitValue1: '10',
  jodiDigitValue2: '1000',
  singlePanaValue1: '10',
  singlePanaValue2: '1500',
  doublePanaValue1: '10',
  doublePanaValue2: '3000',
  tripplePanaValue1: '10',
  tripplePanaValue2: '7000',
  halfSangamValue1: '10',
  halfSangamValue2: '10000',
  fullSangamValue1: '10',
  fullSangamValue2: '100000',
};

// A reusable component for each input field with its label to keep the code DRY
const RateInput = ({ label, id, value, onChange, disabled }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="font-medium text-gray-700">{label}</Label>
    <Input
      id={id}
      type="number"
      value={value}
      onChange={onChange}
      disabled={disabled}
      required
    />
  </div>
);

const GameRates3 = () => {
  const [rates, setRates] = useState(initialRates);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A single handler to update the state for any input field
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRates(prevRates => ({
      ...prevRates,
      [id]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Re-structuring the flat state into a nested object format suitable for an API
    const formData = {
      singleDigit: { value1: Number(rates.singleDigitValue1), value2: Number(rates.singleDigitValue2) },
      jodiDigit: { value1: Number(rates.jodiDigitValue1), value2: Number(rates.jodiDigitValue2) },
      singlePana: { value1: Number(rates.singlePanaValue1), value2: Number(rates.singlePanaValue2) },
      doublePana: { value1: Number(rates.doublePanaValue1), value2: Number(rates.doublePanaValue2) },
      tripplePana: { value1: Number(rates.tripplePanaValue1), value2: Number(rates.tripplePanaValue2) },
      halfSangam: { value1: Number(rates.halfSangamValue1), value2: Number(rates.halfSangamValue2) },
      fullSangam: { value1: Number(rates.fullSangamValue1), value2: Number(rates.fullSangamValue2) },
    };

    console.log('Form Data to be sent to API:', formData);

    // --- DUMMY API CALL ---
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/update-game-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Since the API is a dummy, we'll simulate success even if it fails
      if (!response.ok) {
        console.warn(`Dummy API call failed with status: ${response.status}. This is expected.`);
      }
      
      alert('Game rates updated successfully! (Simulated)');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define the form fields to be rendered to avoid repetition in JSX
  const formFields = [
    { id: 'singleDigit', label: 'Single Digit' },
    { id: 'jodiDigit', label: 'Jodi Digit' },
    { id: 'singlePana', label: 'Single Pana' },
    { id: 'doublePana', label: 'Double Pana' },
    { id: 'tripplePana', label: 'Tripple Pana' },
    { id: 'halfSangam', label: 'Half Sangam' },
    { id: 'fullSangam', label: 'Full Sangam' },
  ];

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add Games Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              {/* Map over the fields to render input pairs */}
              {formFields.map(field => (
                <React.Fragment key={field.id}>
                  <RateInput
                    label={`${field.label} Value 1`}
                    id={`${field.id}Value1`}
                    value={rates[`${field.id}Value1`]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <RateInput
                    label={`${field.label} Value 2`}
                    id={`${field.id}Value2`}
                    value={rates[`${field.id}Value2`]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </React.Fragment>
              ))}
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameRates3;