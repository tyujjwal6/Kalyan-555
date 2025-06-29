import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// A reusable date input component with a calendar icon to keep the code clean.
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

const BidHistory = () => {
  // State to hold filter values in a single object for easy API submission.
  const [filters, setFilters] = useState({
    date: '29-06-2025',
    gameName: '',
    gameType: '',
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
    console.log("Fetching Bid History Report with filters:", filters);
    alert("Dummy API call initiated! Check the console to see the filter data. The table below would be populated with the results.");
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Bid History Report Filter Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Bid History Report</CardTitle>
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
                  <SelectItem value="game1">Game One</SelectItem>
                  <SelectItem value="game2">Game Two</SelectItem>
                  <SelectItem value="game3">Game Three</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="game-type" className="text-sm font-medium">Game Type</Label>
              <Select onValueChange={(value) => handleFilterChange('gameType', value)}>
                <SelectTrigger id="game-type" className="mt-1">
                  <SelectValue placeholder="-Select Game Type-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="triple">Triple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              {/* This label replicates the semicolon from the design */}
              <Label className="text-sm font-medium text-gray-700">;</Label>
              <Button type="submit" className="w-full mt-1 bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Bid History List Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Bid History List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Bid TX ID</TableHead>
                  <TableHead>Game Name</TableHead>
                  <TableHead>Game Type</TableHead>
                  <TableHead>Digit</TableHead>
                  <TableHead>Paana</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              {/* The table body is empty as per the screenshot. */}
              {/* In a real application, you would map over the fetched data here. */}
              {/* For now, we can show a message if there's no data. */}
              <TableBody>
                <TableRow>
                  <TableCell colSpan="7" className="text-center text-gray-500 py-10">
                    No bid history found. Please use the filters above to generate a report.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidHistory;