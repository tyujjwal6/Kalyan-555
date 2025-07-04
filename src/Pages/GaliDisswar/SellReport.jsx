import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"; // Import Loader2 for spinner

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// --- Mock Data and Components ---
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

const MOCK_REPORT_DATA = {
    totalSellAmount: 152340,
    totalBids: 876,
    topSellingDigit: "7",
    topSellingJodi: "72",
};

// A new component to display the fetched report
const ReportDisplay = ({ data, filters }) => (
    <div className="p-4 w-full">
        <h3 className="text-xl font-semibold text-center mb-6">
            Sell Report for {gameNames.find(g => g.value === filters.gameName)?.label} on {format(filters.date, "dd-MM-yyyy")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Total Sell Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{data.totalSellAmount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Total Bids</p>
                <p className="text-2xl font-bold">{data.totalBids.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Top Selling Digit</p>
                <p className="text-2xl font-bold">{data.topSellingDigit}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Top Selling Jodi</p>
                <p className="text-2xl font-bold">{data.topSellingJodi}</p>
            </div>
        </div>
    </div>
);


const SellReport = () => {
    // State for form inputs
    const [date, setDate] = useState(new Date("2025-06-29"));
    const [gameName, setGameName] = useState("");
    const [gameType, setGameType] = useState("all");

    // --- NEW: State for modals and data fetching ---
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Updated form submission handler to manage modals
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Validation
        if (!date || !gameName) {
            setError("Please select a date and a game name.");
            return;
        }

        // 2. Start Loading
        setIsLoading(true);
        setReportData(null);
        setError(null);

        const formData = { date, gameName, gameType };
        console.log("Submitting form data:", formData);

        // 3. Simulate API Call
        setTimeout(() => {
            // On success, set data and stop loading
            setReportData(MOCK_REPORT_DATA);
            setIsLoading(false);
        }, 2000); // 2-second delay
    };

    return (
        <>
            <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col items-center gap-6">
                <Card className="w-full max-w-5xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Gali Disswar Sell Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:flex-wrap items-end gap-x-6 gap-y-4">
                            {/* Form fields (no changes here) */}
                            <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                                <Label htmlFor="date">Date</Label>
                                <Popover><PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-2", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent></Popover>
                            </div>
                            <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                                <Label htmlFor="gameName">Game Name</Label>
                                <Select onValueChange={setGameName} value={gameName}><SelectTrigger id="gameName" className="mt-2"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger><SelectContent>{gameNames.map((game) => (<SelectItem key={game.value} value={game.value}>{game.label}</SelectItem>))}</SelectContent></Select>
                            </div>
                            <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                                <Label htmlFor="gameType">Game Type</Label>
                                <Select onValueChange={setGameType} value={gameType}><SelectTrigger id="gameType" className="mt-2"><SelectValue /></SelectTrigger><SelectContent>{gameTypes.map((type) => (<SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>))}</SelectContent></Select>
                            </div>
                            <div className="w-full sm:w-auto">
                                <Button type="submit" size="lg" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? "Generating..." : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Result Display Area with conditional rendering */}
                <Card className="w-full max-w-5xl shadow-lg min-h-[240px] flex items-center justify-center">
                    {reportData && !isLoading && <ReportDisplay data={reportData} filters={{ date, gameName, gameType }} />}
                    {!reportData && !isLoading && <div className="text-center text-gray-400">Report results will be displayed here.</div>}
                    {isLoading && <div className="text-center text-gray-500"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />Generating report...</div>}
                </Card>
            </div>

            {/* --- MODALS SECTION --- */}
            {/* Error Modal */}
            <Dialog open={!!error} onOpenChange={() => setError(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Validation Error</DialogTitle>
                        <DialogDescription className="pt-2">{error}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">OK</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SellReport;