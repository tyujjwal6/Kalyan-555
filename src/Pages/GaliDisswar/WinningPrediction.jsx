import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, TrendingUp, Landmark } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

// Function to generate numbers from "000" to "999"
const generateNumbers = () => {
  return Array.from({ length: 1000 }, (_, i) => i.toString().padStart(3, '0'));
};

const WinningPrediction = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    date: new Date('2025-06-29'),
    gameName: '',
    number: '000',
  });

  // State to hold the prediction results from the API
  const [predictionResults, setPredictionResults] = useState([]);
  
  // State for summary data
  const [summary, setSummary] = useState({
    totalBid: 0,
    totalWinning: 0,
  });

  const numberOptions = generateNumbers();

  // Handler for form input changes
  const handleValueChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Dummy API call handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form data to dummy API:', formData);

    // --- Backend Integration Point ---
    // In a real application, you would make an API call here.
    // For example:
    // try {
    //   const response = await fetch('/api/winning-prediction', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await response.json();
    //   setPredictionResults(data.results);
    //   setSummary(data.summary);
    // } catch (error) {
    //   console.error('Failed to fetch prediction:', error);
    // }
    
    alert(`Dummy API called with data:
      Date: ${format(formData.date, 'dd-MM-yyyy')}
      Game Name: ${formData.gameName}
      Number: ${formData.number}`);
      
    // For now, we'll keep the results empty as per the screenshot
    setPredictionResults([]);
    setSummary({ totalBid: 0, totalWinning: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Winning Prediction Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Winning prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
          >
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleValueChange('date', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="game-name">Game Name</Label>
              <Select onValueChange={(value) => handleValueChange('gameName', value)}>
                <SelectTrigger id="game-name">
                  <SelectValue placeholder="-Select Game Name-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kalyan_morning">KALYAN MORNING</SelectItem>
                  <SelectItem value="milan_day">MILAN DAY</SelectItem>
                  <SelectItem value="rajdhani_night">RAJDHANI NIGHT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Select
                value={formData.number}
                onValueChange={(value) => handleValueChange('number', value)}
              >
                <SelectTrigger id="number">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {numberOptions.map((num) => (
                    <SelectItem key={num} value={num}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Winning Prediction List Card */}
      <Card>
        <CardHeader>
          <CardTitle>Winning Prediction List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700">
              <TrendingUp className="h-5 w-5" />
              <span>Total Bid Amount</span>
              <span className="font-bold">{summary.totalBid}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700">
              <Landmark className="h-5 w-5" />
              <span>Total Winning Amount</span>
              <span className="font-bold">{summary.totalWinning}</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Bid Points</TableHead>
                  <TableHead>Winning Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bid TX ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictionResults.length > 0 ? (
                  predictionResults.map((result, index) => (
                    <TableRow key={result.bidTxId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{result.userName}</TableCell>
                      <TableCell>{result.bidPoints}</TableCell>
                      <TableCell>{result.winningAmount}</TableCell>
                      <TableCell>{result.type}</TableCell>
                      <TableCell>{result.bidTxId}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results to display. Please submit a prediction.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinningPrediction;