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

const GameWinningReport = () => {
  // State to hold filter values in a single object for easy API submission.
  const [filters, setFilters] = useState({
    date: '29-06-2025',
    gameName: '',
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
    console.log("Fetching Winning Report with filters:", filters);
    alert("Dummy API call initiated! Check the console for filter data. The table below would be populated with results.");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Starline Winning Report Filter Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-serif text-gray-700">Starline Winning Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
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
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Winning History List Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Winning History List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Game Name</TableHead>
                  <TableHead>Game Type</TableHead>
                  <TableHead>Pana</TableHead>
                  <TableHead>Digit</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Tx Id</TableHead>
                  <TableHead>Tx Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* The table body is empty as per the screenshot. */}
                {/* In a real application, you would map over the fetched data here. */}
                {/* This message provides better UX than a completely empty table. */}
                <TableRow>
                  <TableCell colSpan="9" className="text-center text-gray-500 py-10">
                    No winning history found. Please use the filters above to generate a report.
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

export default GameWinningReport;