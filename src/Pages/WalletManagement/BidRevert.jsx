import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Import the cn utility function (path may vary based on your project structure)
import { cn } from "@/lib/utils";

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


// Dummy data for the game list dropdown
const dummyGames = [
  { id: 'game_1', name: 'Super Lotto' },
  { id: 'game_2', name: 'Mega Millions' },
  { id: 'game_3', name: 'Powerball' },
  { id: 'game_4', name: 'Daily Spin' },
];

// Dummy data to simulate API response for the bid list
const dummyBidResponse = [
    { id: 1, userName: 'PlayerOne', bidPoints: 500, type: 'Single' },
    { id: 2, userName: 'HighRoller', bidPoints: 1200, type: 'Jodi' },
    { id: 3, userName: 'LuckyUser', bidPoints: 250, type: 'Panna' },
];


const BidRevert = () => {
  // State to hold the selected date and game name
  const [date, setDate] = useState(new Date('2025-06-30'));
  const [gameName, setGameName] = useState('');
  const [bidList, setBidList] = useState([]); // Initially empty list
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!date || !gameName) {
      alert('Please select a date and a game name.');
      return;
    }
    
    setIsSubmitting(true);
    setIsLoadingList(true);
    setBidList([]); // Clear previous list while fetching new one

    // Prepare form data for the API
    const formData = {
      date: format(date, 'yyyy-MM-dd'), // Send date in a standard format
      gameId: gameName,
    };

    console.log('Form Data to be sent to API:', formData);

    // --- DUMMY API CALL ---
    // In a real application, you would fetch data based on the formData
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demonstration, we use dummy data
      console.log('Dummy API call successful. Populating list.');
      setBidList(dummyBidResponse);
      
    } catch (error) {
      console.error('Error fetching bid revert list:', error);
      alert('An error occurred while fetching the list. Please check the console.');
    } finally {
      setIsSubmitting(false);
      setIsLoadingList(false);
    }
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Card: Bid Revert Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Bid Revert</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="game-name">Game Name</Label>
                <Select
                  id="game-name"
                  value={gameName}
                  onValueChange={setGameName}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="-Select Game Name-" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyGames.map((game) => (
                      <SelectItem key={game.id} value={game.id}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* --- UPDATED BUTTON --- */}
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

        {/* Bottom Card: Bid Revert List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Bid Revert List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Bid Points</TableHead>
                  <TableHead className="text-right">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingList ? (
                    <TableRow>
                        <TableCell colSpan="4" className="h-24 text-center">
                            Loading...
                        </TableCell>
                    </TableRow>
                ) : bidList.length > 0 ? (
                  bidList.map((bid, index) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{bid.userName}</TableCell>
                      <TableCell>{bid.bidPoints}</TableCell>
                      <TableCell className="text-right">{bid.type}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="h-24 text-center">
                      No results to display. Submit the form to fetch data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BidRevert;