import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

// Import required shadcn/ui components
// Make sure you have these components installed in your project
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// A utility function for combining class names, typically found in 'src/lib/utils.js' in a shadcn setup
// If you don't have it, you can use this simple implementation or install `clsx` and `tailwind-merge`.
const cn = (...classes) => classes.filter(Boolean).join(' ');

const UserBidHistory = () => {
  // State for form inputs, initialized with values from the image
  const [date, setDate] = useState(new Date('2025-06-29'));
  const [gameName, setGameName] = useState('');
  const [gameType, setGameType] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data for API submission
    const formData = {
      date: date ? format(date, 'yyyy-MM-dd') : null,
      gameName,
      gameType,
    };

    console.log('Submitting Form Data:', formData);

    // Dummy API call using fetch
    try {
      // Using a public dummy API endpoint for demonstration
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Dummy API Success Response:', result);
      alert('Report submitted successfully! Check the console for data and API response.');
    } catch (error) {
      console.error('Error submitting form to dummy API:', error);
      alert('Failed to submit report. Check the console for more details.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto space-y-8">
        {/* Bid History Report Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bid History Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Game Name</label>
                <Select onValueChange={setGameName} value={gameName}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Game Name--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kalyan_morning">Kalyan Morning</SelectItem>
                    <SelectItem value="milan_day">Milan Day</SelectItem>
                    <SelectItem value="rajdhani_night">Rajdhani Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Game Type Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Game Type</label>
                <Select onValueChange={setGameType} value={gameType}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Game Type--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_digit">Single Digit</SelectItem>
                    <SelectItem value="jodi_digit">Jodi Digit</SelectItem>
                    <SelectItem value="single_paana">Single Paana</SelectItem>
                    <SelectItem value="double_paana">Double Paana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bid History List Table Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bid History List</CardTitle>
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
                    <TableHead>Session</TableHead>
                    <TableHead>Open Paana</TableHead>
                    <TableHead>Open Digit</TableHead>
                    <TableHead>Close Paana</TableHead>
                    <TableHead>Close Digit</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* This is an empty state. You would map over your data here. */}
                  <TableRow>
                    <TableCell colSpan="11" className="text-center text-muted-foreground">
                      No bid history available for the selected criteria.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserBidHistory;