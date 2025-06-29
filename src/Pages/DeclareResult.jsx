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

// Reusable DateInput component
const DateInput = ({ id, value, onChange, label }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
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

const DeclareResult = () => {
  const [selectGameData, setSelectGameData] = useState({
    resultDate: '29-06-2025',
    gameName: '',
    session: '',
  });

  const [historyFilterDate, setHistoryFilterDate] = useState('29-06-2025');

  const gameHistory = [
    { id: 1, gameName: 'LAXMI MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:45:22 AM', closeDeclareDate: '29 Jun 2025 11:45:44 AM', openPana: '400-4', closePana: '9-333' },
    { id: 2, gameName: 'KARNATAKA DAY', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:46:09 AM', closeDeclareDate: '29 Jun 2025 11:46:26 AM', openPana: '125-8', closePana: '6-358' },
    { id: 3, gameName: 'MILAN MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:46:46 AM', closeDeclareDate: '29 Jun 2025 11:47:00 AM', openPana: '134-8', closePana: '2-129' },
    { id: 4, gameName: 'KALYAN MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:47:17 AM', closeDeclareDate: '29 Jun 2025 12:12:41 PM', openPana: '235-0', closePana: '8-279' },
    { id: 5, gameName: 'MADHUR MORNING', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:47:30 AM', closeDeclareDate: '29 Jun 2025 01:06:12 PM', openPana: '156-2', closePana: '4-347' },
    { id: 6, gameName: 'SRIDEVI', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 11:52:45 AM', closeDeclareDate: '29 Jun 2025 01:08:28 PM', openPana: '134-8', closePana: '7-458' },
    { id: 7, gameName: 'MADHUR DAY', resultDate: '29 Jun 2025', openDeclareDate: '29 Jun 2025 01:49:27 PM', closeDeclareDate: 'N/A', openPana: '378-8', closePana: '*-***' },
  ];

  const handleDeclareResult = (e) => {
    e.preventDefault();
    if (!selectGameData.gameName || !selectGameData.session) {
      alert("Please select a Game Name and Session.");
      return;
    }
    console.log("Declaring result with data:", selectGameData);
    alert(`Dummy API call: Declaring result for ${selectGameData.gameName} on ${selectGameData.resultDate}`);
  };

  const handleDelete = (gameId, gameName) => {
    const payload = { gameId, gameName, action: 'delete' };
    console.log("Deleting result:", payload);
    alert(`Dummy API call: Deleting result for ${gameName} (ID: ${gameId})`);
  };

  const handleEdit = (gameId, gameName) => {
    const payload = { gameId, gameName, action: 'edit' };
    console.log("Editing result:", payload);
    alert(`Dummy API call: Editing result for ${gameName} (ID: ${gameId})`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Select Game Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Select Game</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeclareResult} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <DateInput
              id="resultDate"
              label="Result Date"
              value={selectGameData.resultDate}
              onChange={(e) => setSelectGameData({ ...selectGameData, resultDate: e.target.value })}
            />

            <div>
              <Label htmlFor="gameName" className="text-sm font-medium">Game Name</Label>
              <Select onValueChange={(value) => setSelectGameData({ ...selectGameData, gameName: value })}>
                <SelectTrigger id="gameName" className="mt-1">
                  <SelectValue placeholder="Select Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LAXMI MORNING">LAXMI MORNING</SelectItem>
                  <SelectItem value="KARNATAKA DAY">KARNATAKA DAY</SelectItem>
                  <SelectItem value="MILAN MORNING">MILAN MORNING</SelectItem>
                  <SelectItem value="KALYAN MORNING">KALYAN MORNING</SelectItem>
                  <SelectItem value="MADHUR MORNING">MADHUR MORNING</SelectItem>
                  <SelectItem value="SRIDEVI">SRIDEVI</SelectItem>
                  <SelectItem value="MADHUR DAY">MADHUR DAY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="session" className="text-sm font-medium">Session</Label>
              <Select onValueChange={(value) => setSelectGameData({ ...selectGameData, session: value })}>
                <SelectTrigger id="session" className="mt-1">
                  <SelectValue placeholder="-Select Session-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Go</Button>
          </form>
        </CardContent>
      </Card>

      {/* Game History Table */}
      <Card className="mt-8">
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
                  <TableHead>Open Declare Date</TableHead>
                  <TableHead>Close Declare Date</TableHead>
                  <TableHead>Open Pana</TableHead>
                  <TableHead>Close Pana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameHistory.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>{game.id}</TableCell>
                    <TableCell className="font-medium">{game.gameName}</TableCell>
                    <TableCell>{game.resultDate}</TableCell>
                    <TableCell>{game.openDeclareDate}</TableCell>
                    <TableCell>{game.closeDeclareDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600 min-w-[50px]">{game.openPana}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(game.id, game.gameName)}>Delete</Button>
                        <Button size="sm" onClick={() => handleEdit(game.id, game.gameName)}>Edit</Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600 min-w-[50px]">{game.closePana}</span>
                        {game.closeDeclareDate !== 'N/A' && (
                          <>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(game.id, game.gameName)}>Delete</Button>
                            <Button size="sm" onClick={() => handleEdit(game.id, game.gameName)}>Edit</Button>
                          </>
                        )}
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

export default DeclareResult;
