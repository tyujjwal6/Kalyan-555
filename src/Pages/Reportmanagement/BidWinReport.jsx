import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // This utility is part of the default shadcn/ui setup

const BidWinReport = () => {
  // State for form fields
  // Note: JavaScript months are 0-indexed, so 5 represents June.
  const [date, setDate] = useState(new Date(2025, 5, 30)); 
  const [gameName, setGameName] = useState("");

  // Dummy data for game names. In a real application, this would come from an API.
  const gameOptions = [
    { id: "game1", name: "Starline" },
    { id: "game2", name: "King Bazar" },
    { id: "game3", name: "Disawar" },
    { id: "game4", name: "Gali" },
  ];
  
  // State to hold report results (currently unused as per the screenshot, but ready for future use)
  const [reportData, setReportData] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Simple validation
    if (!gameName) {
      alert("Please select a game name.");
      return;
    }

    // Prepare form data for the backend API
    const formData = {
      // Format the date to a standard format like YYYY-MM-DD
      reportDate: date ? format(date, "yyyy-MM-dd") : null,
      gameName: gameName,
    };

    console.log("Submitting form with data:", formData);
    alert(`A dummy API would be called with this data: ${JSON.stringify(formData)}`);
    
    // --- DUMMY API CALL ---
    // In a real application, you would make a fetch request to your backend here.
    try {
      // Example of what an API call might look like:
      // const response = await fetch('/api/winning-history', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();
      //
      // if (response.ok) {
      //   setReportData(result); // Set the data to display in a table/list below
      // } else {
      //   // Handle API errors (e.g., show a toast notification)
      //   console.error("API Error:", result.message);
      // }
    } catch (error) {
      console.error("Failed to fetch winning history report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Winning History Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              
              {/* Date Picker */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Game Name Select */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="game-name" className="text-sm font-medium text-gray-700">
                  Game Name
                </label>
                <Select onValueChange={setGameName} value={gameName}>
                  <SelectTrigger id="game-name" className="w-full sm:w-[280px]">
                    <SelectValue placeholder="-Select Game Name-" />
                  </SelectTrigger>
                  <SelectContent>
                    {gameOptions.map((game) => (
                      <SelectItem key={game.id} value={game.name}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              {/* UPDATED: Added Tailwind CSS classes to make the button blue */}
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* This section is ready for when you implement the data display */}
        {/* 
        {reportData && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Report Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>{JSON.stringify(reportData, null, 2)}</pre>
            </CardContent>
          </Card>
        )} 
        */}
      </div>
    </div>
  );
};

export default BidWinReport;