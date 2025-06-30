import React, { useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Assumes shadcn/ui setup

// Lucide React Icons
import { Calendar as CalendarIcon, Activity, Wallet } from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";

const submitWinningPrediction = async (data) => {
  console.log("Holding selected data and hitting dummy API:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Dummy API call successful!");
  return { success: true, message: "Prediction submitted successfully." };
};

const WinningPrediction3 = () => {
  const [date, setDate] = useState(new Date('2025-06-30'));
  const [gameName, setGameName] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [openPana, setOpenPana] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      date: date ? format(date, "dd-MM-yyyy") : "",
      gameName,
      sessionTime,
      openPana,
    };

    try {
      const response = await submitWinningPrediction(formData);
      alert(response.message);
    } catch (error) {
      console.error("Failed to submit prediction:", error);
      alert("Failed to submit prediction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Winning prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-semibold text-gray-700">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}> 
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="game-name" className="font-semibold text-gray-700">Game Name</Label>
                  <Select onValueChange={setGameName} value={gameName}>
                    <SelectTrigger id="game-name" className="w-full">
                      <SelectValue placeholder="-Select Game Name-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kalyan_morning">Kalyan Morning</SelectItem>
                      <SelectItem value="milan_day">Milan Day</SelectItem>
                      <SelectItem value="rajdhani_night">Rajdhani Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-time" className="font-semibold text-gray-700">Session Time</Label>
                  <Select onValueChange={setSessionTime} value={sessionTime}>
                    <SelectTrigger id="session-time" className="w-full">
                      <SelectValue placeholder="-Select Market Time-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="close">Close</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="open-pana" className="font-semibold text-gray-700">Open Pana</Label>
                  <Select onValueChange={setOpenPana} value={openPana}>
                    <SelectTrigger id="open-pana" className="w-full">
                      <SelectValue placeholder="Select open number" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 100 }, (_, i) => String(i + 100).padStart(3, '0')).map(num => (
                        <SelectItem key={num} value={num}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-[#007bff] hover:bg-[#0069d9] text-white h-10" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Winning Prediction List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-slate-100 py-2 px-4 rounded-lg text-sm font-medium text-gray-700">
                <Activity className="h-5 w-5 text-gray-600" />
                <span>Total Bid Amount</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 py-2 px-4 rounded-lg text-sm font-medium text-gray-700">
                <Wallet className="h-5 w-5 text-gray-600" />
                <span>Total Winning Amount</span>
                <span className="font-bold">0</span>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold text-gray-600">#</TableHead>
                    <TableHead className="font-bold text-gray-600">User Name</TableHead>
                    <TableHead className="font-bold text-gray-600">Bid Points</TableHead>
                    <TableHead className="font-bold text-gray-600">Winning Amount</TableHead>
                    <TableHead className="font-bold text-gray-600">Type</TableHead>
                    <TableHead className="font-bold text-gray-600">Bid TX ID</TableHead>
                    <TableHead className="font-bold text-gray-600">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-16">
                      There are no records to display
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

export default WinningPrediction3;