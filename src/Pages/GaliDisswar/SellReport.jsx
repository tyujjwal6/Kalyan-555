import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Assumes you have the shadcn/ui utils file
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
import { Label } from "@/components/ui/label";

const SellReport = () => {
    // State for form inputs, initialized to match the image
    const [date, setDate] = useState(new Date("2025-06-29"));
    const [gameName, setGameName] = useState("");
    const [gameType, setGameType] = useState("all");
    const [reportData, setReportData] = useState(null); // To hold results after fetch
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for select options. You can fetch this from an API.
    const gameNames = [
        { value: "gali", label: "GALI" },
        { value: "disswar", label: "DISSWAR" },
        { value: "faridabad", label: "FARIDABAD" },
        { value: "ghaziabad", label: "GHAZIABAD" },
    ];

    const gameTypes = [
        { value: "all", label: "All" },
        { value: "single", label: "Single Digit" },
        { value: "jodi", label: "Jodi" },
        { value: "pana", label: "Pana" },
    ];

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!date || !gameName) {
            alert("Please select a date and a game name.");
            return;
        }

        setIsLoading(true);
        setReportData(null);

        // Structure the data for the backend API
        const formData = {
            date: format(date, "yyyy-MM-dd"), // Standard date format
            gameName: gameName,
            gameType: gameType,
        };

        console.log("Submitting form data:", formData);

        // Simulate hitting a dummy API
        try {
            // Replace with your actual backend API endpoint
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Dummy API Response:", result);
                alert('Report request submitted successfully! Check console for data.');
                // In a real app, you would set the report data to be displayed
                // setReportData(resultFromApi); 
            } else {
                console.error("API submission failed with status:", response.status);
                alert('Failed to submit report request.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('An error occurred while submitting the request.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col items-center gap-6">
            <Card className="w-full max-w-5xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Gali Disswar Sell Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:flex-wrap items-end gap-x-6 gap-y-4">
                        {/* Date Picker */}
                        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal mt-2",
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
                        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                            <Label htmlFor="gameName">Game Name</Label>
                            <Select onValueChange={setGameName} value={gameName}>
                                <SelectTrigger id="gameName" className="mt-2">
                                    <SelectValue placeholder="-Select Game Name-" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gameNames.map((game) => (
                                        <SelectItem key={game.value} value={game.value}>
                                            {game.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Game Type Select */}
                        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                            <Label htmlFor="gameType">Game Type</Label>
                            <Select onValueChange={setGameType} value={gameType}>
                                <SelectTrigger id="gameType" className="mt-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {gameTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <div className="w-full sm:w-auto">
                            <Button type="submit" size="lg" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Result Display Area */}
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg min-h-[240px] p-4">
                {isLoading && <div className="flex justify-center items-center h-full text-gray-500">Generating report...</div>}
                {!isLoading && !reportData && <div className="flex justify-center items-center h-full text-gray-400">Report results will be displayed here.</div>}
                {/* When reportData is available, you can map through it and display it here */}
            </div>
        </div>
    );
};

export default SellReport;