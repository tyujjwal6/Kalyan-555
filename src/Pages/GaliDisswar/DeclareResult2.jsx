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
        value={value}
        onChange={onChange}
        className="pr-10"
        placeholder="DD-MM-YYYY"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  </div>
);

const DeclareResults = () => {
  // State for the "Select Game" form data
  const [selectGameData, setSelectGameData] = useState({
    resultDate: '29-06-2025',
    gameName: '',
  });

  // State for the "Game Result History" filter date
  const [historyFilterDate, setHistoryFilterDate] = useState('29-06-2025');

  // Mock data for the game history table
  const gameHistory = [
    { id: 1, gameName: 'STARLINE-1', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 09:01:14 AM', number: '110-2' },
    { id: 2, gameName: 'STARLINE-2', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 10:09:03 AM', number: '115-7' },
    { id: 3, gameName: 'STARLINE-3', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:06:50 PM', number: '560-1' },
    { id: 4, gameName: 'STARLINE-4', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 01:08:41 PM', number: '158-4' },
    { id: 5, gameName: 'STARLINE-5', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 02:33:30 PM', number: '179-7' },
    { id: 6, gameName: 'STARLINE-6', resultDate: '29 Jun 2025', declareDate: '29 Jun 2025 03:49:28 PM', number: '157-3' },
  ];

  /**
   * Handles the submission of the "Select Game" form.
   * Simulates an API call with the form data.
   */
  const handleDeclareResult = (e) => {
    e.preventDefault();
    if (!selectGameData.gameName) {
      alert("Please select a Game Name.");
      return;
    }
    // In a real app, you would send this data to your backend API
    console.log("Declaring result with data:", selectGameData);
    alert(`Dummy API call: Declaring result for ${selectGameData.gameName} on ${selectGameData.resultDate}`);
  };

  /**
   * Handles the "Delete" action in the history table.
   * Simulates an API call.
   */
  const handleDelete = (gameId, gameName) => {
    const payload = { gameId, gameName, action: 'delete' };
    console.log("Deleting result:", payload);
    alert(`Dummy API call: Deleting result for ${gameName} (ID: ${gameId})`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Select Game Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Select Game</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeclareResult} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            {/* The label "Result Date Result Date" in the image is likely a typo. Using "Result Date" for clarity. */}
            <DateInput
              id="resultDate"
              label="Result Date"
              value={selectGameData.resultDate}
              onChange={(e) => setSelectGameData(prev => ({...prev, resultDate: e.target.value}))}
            />

            <div>
              <Label htmlFor="gameName" className="text-sm font-medium">Game Name</Label>
              <Select onValueChange={(value) => setSelectGameData(prev => ({ ...prev, gameName: value }))}>
                <SelectTrigger id="gameName" className="mt-1">
                  <SelectValue placeholder="Select Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STARLINE-1">STARLINE-1</SelectItem>
                  <SelectItem value="STARLINE-2">STARLINE-2</SelectItem>
                  <SelectItem value="STARLINE-3">STARLINE-3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Go</Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Game Result History Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Game Result History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 w-full md:w-1/4">
            <DateInput
              id="historyDate"
              label="Select Result Date"
              value={historyFilterDate}
              onChange={(e) => setHistoryFilterDate(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Game Name</TableHead>
                  <TableHead>Result Date</TableHead>
                  <TableHead>Declare Date</TableHead>
                  <TableHead>Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameHistory.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>{game.id}</TableCell>
                    <TableCell className="font-medium">{game.gameName}</TableCell>
                    <TableCell>{game.resultDate}</TableCell>
                    <TableCell>{game.declareDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600 min-w-[50px]">{game.number}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(game.id, game.gameName)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclareResults;