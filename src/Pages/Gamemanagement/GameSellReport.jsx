import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from 'lucide-react';

// A reusable date input component to keep the code clean and consistent.
const DateInput = ({ id, value, onChange, label }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    <div className="relative mt-1">
      <Input
        id={id}
        name="date"
        value={value}
        onChange={onChange}
        className="pr-10"
        placeholder="DD-MM-YYYY"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  </div>
);

const GameSellReport = () => {
  // State to hold filter values in a single object for easy API submission.
  const [filters, setFilters] = useState({
    date: '29-06-2025',
    gameName: '',
    gameType: 'all', // Default value set to 'All'
  });
  
  // A single handler to update the state for any filter change.
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  // Handler for form submission to fetch the report.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate hitting a dummy API with the collected filter data.
    console.log("Fetching Starline Sell Report with filters:", filters);
    alert("Dummy API call initiated! Check the console to see the filter data. The report would appear below.");
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Starline Sell Report Filter Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-serif text-gray-700">Starline Sell Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <DateInput
              id="report-date"
              label="Date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />

            <div>
              <Label htmlFor="game-name" className="text-sm font-medium">Game Name</Label>
              <Select onValueChange={(value) => handleFilterChange('gameName', value)}>
                <SelectTrigger id="game-name" className="mt-1">
                  <SelectValue placeholder="-Select Game Name-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="game1">Starline Game 1</SelectItem>
                  <SelectItem value="game2">Starline Game 2</SelectItem>
                  <SelectItem value="game3">Starline Game 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="game-type" className="text-sm font-medium">Game Type</Label>
              <Select defaultValue="all" onValueChange={(value) => handleFilterChange('gameType', value)}>
                <SelectTrigger id="game-type" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Placeholder for the report results */}
      <Card className="shadow-md min-h-[200px] flex items-center justify-center">
        <CardContent className="text-center text-gray-500">
          <p>The sell report will be displayed here after submission.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSellReport;