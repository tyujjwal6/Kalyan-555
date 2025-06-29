import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// You can import any lucide icon like this, though none are used in this specific UI.
// import { Gamepad2 } from "lucide-react";

const GameRates2 = () => {
  // State to hold the form data with initial values from the image
  const [formData, setFormData] = useState({
    singleDigitValue1: '10',
    singleDigitValue2: '95',
    singlePanaValue1: '10',
    singlePanaValue2: '95',
    doublePanaValue1: '10',
    doublePanaValue2: '950',
  });

  // Handler to update state when input values change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Dummy API call simulation
    try {
      // Replace with your actual backend API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Dummy API Response:", result);
        alert('Game rates submitted successfully!');
      } else {
        console.error("API submission failed with status:", response.status);
        alert('Failed to submit game rates.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Games Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Column 1 */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="singleDigitValue1">Single Digit Value 1</Label>
                  <Input
                    id="singleDigitValue1"
                    name="singleDigitValue1"
                    value={formData.singleDigitValue1}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="singlePanaValue1">Single Pana Value 1</Label>
                  <Input
                    id="singlePanaValue1"
                    name="singlePanaValue1"
                    value={formData.singlePanaValue1}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doublePanaValue1">Double Pana Value 1</Label>
                  <Input
                    id="doublePanaValue1"
                    name="doublePanaValue1"
                    value={formData.doublePanaValue1}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="singleDigitValue2">Single Digit Value 2</Label>
                  <Input
                    id="singleDigitValue2"
                    name="singleDigitValue2"
                    value={formData.singleDigitValue2}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="singlePanaValue2">Single Pana Value 2</Label>
                  <Input
                    id="singlePanaValue2"
                    name="singlePanaValue2"
                    value={formData.singlePanaValue2}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doublePanaValue2">Double Pana Value 2</Label>
                  <Input
                    id="doublePanaValue2"
                    name="doublePanaValue2"
                    value={formData.doublePanaValue2}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button type="submit" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameRates2;