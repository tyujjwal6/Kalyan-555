import React from 'react';
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from 'lucide-react';

// A helper component for creating sortable table headers.
const SortableHeader = ({ children }) => (
    <TableHead>
        <button className="flex items-center gap-1 font-semibold text-gray-700">
            {children}
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
        </button>
    </TableHead>
);

const GameName = () => {
    // Mock data for the table, matching the screenshot
    const games = [
        { id: 1, name: 'STARLINE-14', nameHindi: 'STARLINE-14', openTime: '11:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 2, name: 'STARLINE-13', nameHindi: 'STARLINE-13', openTime: '10:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 3, name: 'STARLINE-12', nameHindi: 'STARLINE-12', openTime: '09:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 4, name: 'STARLINE-11', nameHindi: 'STARLINE-11', openTime: '08:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 5, name: 'STARLINE-10', nameHindi: 'STARLINE-10', openTime: '07:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 6, name: 'STARLINE-9', nameHindi: 'STARLINE-9', openTime: '06:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 7, name: 'STARLINE-8', nameHindi: 'STARLINE-8', openTime: '05:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 8, name: 'STARLINE-7', nameHindi: 'STARLINE-7', openTime: '04:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 9, name: 'STARLINE-6', nameHindi: 'STARLINE-6', openTime: '03:00 PM', status: 'Yes', marketStatus: 'Market Open' },
        { id: 10, name: 'STARLINE-1', nameHindi: 'STARLINE-1', openTime: '10:00 AM', status: 'Yes', marketStatus: 'Market Open' },
    ];

    // --- Dummy API Handlers ---

    const handleAddGame = () => {
        console.log("Action: Add Game");
        alert("Dummy API Call: Add Game button clicked. You would typically open a modal or navigate to a new page.");
    };
    
    const handleEdit = (gameId, gameName) => {
        const payload = { gameId, gameName, action: 'edit' };
        console.log("Editing game:", payload);
        alert(`Dummy API Call: Edit game "${gameName}" (ID: ${gameId})`);
    };
    
    const handleMarketClose = (gameId, gameName) => {
        const payload = { gameId, gameName, action: 'market_close' };
        console.log("Closing market for game:", payload);
        alert(`Dummy API Call: Closing market for game "${gameName}" (ID: ${gameId})`);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Starline Game Name List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="show-entries" className="text-sm font-normal shrink-0">Show</Label>
                            <Select defaultValue="10">
                                <SelectTrigger id="show-entries" className="w-[80px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm">entries</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAddGame}>
                                Add Game
                            </Button>
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Label htmlFor="search-games" className="text-sm font-normal shrink-0">Search:</Label>
                                <Input id="search-games" className="w-full sm:w-auto" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <SortableHeader>#</SortableHeader>
                                    <SortableHeader>Game Name</SortableHeader>
                                    <SortableHeader>Game Name Hindi</SortableHeader>
                                    <SortableHeader>Open Time</SortableHeader>
                                    <SortableHeader>Status</SortableHeader>
                                    <SortableHeader>Market Status</SortableHeader>
                                    <SortableHeader>Action</SortableHeader>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {games.map((game) => (
                                    <TableRow key={game.id}>
                                        <TableCell>{game.id}</TableCell>
                                        <TableCell className="font-medium">{game.name}</TableCell>
                                        <TableCell>{game.nameHindi}</TableCell>
                                        <TableCell>{game.openTime}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">{game.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">{game.marketStatus}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" onClick={() => handleEdit(game.id, game.name)}>Edit</Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleMarketClose(game.id, game.name)}>Market Close</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Showing 1 to 10 of 14 entries
                        </p>
                        <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm">Previous</Button>
                            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
                            <Button variant="outline" size="sm">2</Button>
                            <Button variant="outline" size="sm">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GameName;