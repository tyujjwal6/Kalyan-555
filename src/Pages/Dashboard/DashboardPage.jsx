import React, { useState, useMemo } from 'react';

// Import necessary components from shadcn/ui and lucide-react
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User, Gamepad2, Tag, Eye, ArrowUpDown } from 'lucide-react';

// --- Reusable Components ---

/**
 * A reusable card for the top-level statistics (Users, Games, Bid Amount).
 */
const StatCard = ({ title, value, icon, color }) => (
  <Card className={`${color} text-white shadow-lg rounded-2xl`}>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <div className="text-lg font-medium">{title}</div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
      <div className="bg-white/20 p-4 rounded-full">
        {icon}
      </div>
    </CardContent>
  </Card>
);

/**
 * A reusable card for the "Total Bids on Single Ank" section.
 */
const AnkCard = ({ ankNumber, bids, amount, color }) => (
  <Card className="shadow-md rounded-xl overflow-hidden">
    <CardHeader className="p-3 bg-white border-b">
      <CardTitle className="text-sm font-semibold text-center text-gray-600">Total Bids {bids}</CardTitle>
    </CardHeader>
    <CardContent className="p-3 text-center">
      <div className="text-4xl font-bold text-gray-800">{amount}</div>
      <p className="text-xs text-gray-500">Total Bid Amount</p>
    </CardContent>
    <div className={`${color} text-white text-center py-1.5 text-sm font-semibold`}>
      Ank {ankNumber}
    </div>
  </Card>
);


// --- Main Dashboard Component ---

const DashboardPage = () => {
  // State for the forms
  const [marketBidGame, setMarketBidGame] = useState('');
  const [singleAnkGame, setSingleAnkGame] = useState('');
  const [marketTime, setMarketTime] = useState('');

  // State for the user table
  const [unapprovedUsers, setUnapprovedUsers] = useState([
    { id: 1, user: 'Sandip Kumar', mobile: '7029828702', email: 'temp@gmail.com', date: '04 Jul 2025', balance: 9, betting: 'No', transfer: 'No', active: 'Yes' },
    // Add more dummy users if needed for pagination testing
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Dummy API handler for the "Total Bids on Single Ank" form.
   */
  const handleGetBids = (e) => {
    e.preventDefault();
    if (!singleAnkGame || !marketTime) {
      alert("Please select both a Game Name and a Market Time.");
      return;
    }

    const formData = {
      gameName: singleAnkGame,
      marketTime: marketTime,
      date: '2025-07-04', // The date is static in the UI
    };

    console.log("Holding selected data for 'Get Bids' and hitting dummy API:", formData);
    alert(`Fetching bids for ${formData.gameName} at ${formData.marketTime}. Check console for data.`);
    // In a real app, you would make an API call here.
  };

  /**
   * Dummy API handler for the "View User" action in the table.
   */
  const handleViewUser = (userId) => {
    console.log(`Holding user ID: ${userId} and hitting dummy API to fetch details.`);
    alert(`Viewing details for user ID: ${userId}.`);
    // In a real app, this might open a modal or navigate to a user details page.
  };
  
  const ankData = [
    { ank: 0, bids: 0, amount: 0, color: 'bg-blue-500' },
    { ank: 1, bids: 0, amount: 0, color: 'bg-green-500' },
    { ank: 2, bids: 0, amount: 0, color: 'bg-sky-500' },
    { ank: 3, bids: 0, amount: 0, color: 'bg-yellow-500' },
    { ank: 4, bids: 0, amount: 0, color: 'bg-purple-500' },
    { ank: 5, bids: 0, amount: 0, color: 'bg-orange-500' },
    { ank: 6, bids: 0, amount: 0, color: 'bg-pink-500' },
    { ank: 7, bids: 0, amount: 0, color: 'bg-indigo-500' },
    { ank: 8, bids: 0, amount: 0, color: 'bg-red-500' },
    { ank: 9, bids: 0, amount: 0, color: 'bg-teal-500' },
  ];
  
  const filteredUsers = useMemo(() =>
    unapprovedUsers.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ), [unapprovedUsers, searchTerm]
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header and Breadcrumbs */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DASHBOARD</h1>
        <div className="text-sm text-gray-500">
          <span>Dashboards</span> / <span>Dashboard</span>
        </div>
      </header>
      
      <main className="space-y-8">
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Users" value="1051" icon={<User size={32} />} color="bg-pink-600" />
          <StatCard title="Games" value="22" icon={<Gamepad2 size={32} />} color="bg-blue-600" />
          <StatCard title="Bid Amount" value="200" icon={<Tag size={32} />} color="bg-rose-500" />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg rounded-xl">
            <CardHeader><CardTitle>Market Bid Details</CardTitle></CardHeader>
            <CardContent>
              <label htmlFor="market-game-name" className="text-sm font-medium text-gray-700">Game Name</label>
              <Select id="market-game-name" onValueChange={setMarketBidGame}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="-Select Game Name-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="game1">Game One</SelectItem>
                  <SelectItem value="game2">Game Two</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-6">
                <div className="text-5xl font-bold text-gray-800">N/A</div>
                <div className="text-sm text-gray-500 mt-1">Market Amount</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader><CardTitle>Total Bids On Single Ank Of Date 04 Jul 2025</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleGetBids} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full">
                  <label htmlFor="ank-game-name" className="text-sm font-medium text-gray-700">Game Name</label>
                  <Select id="ank-game-name" onValueChange={setSingleAnkGame}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="-Select Game Name-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="game1">Game One</SelectItem>
                      <SelectItem value="game2">Game Two</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label htmlFor="market-time" className="text-sm font-medium text-gray-700">Market Time</label>
                  <Select id="market-time" onValueChange={setMarketTime}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="-Select Market Time-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="close">Close</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto shrink-0">Get</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Ank Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ankData.map(data => (
                <AnkCard key={data.ank} ankNumber={data.ank} bids={data.bids} amount={data.amount} color={data.color} />
            ))}
        </div>
        
        {/* Un-Approved Users Table */}
        <Card className="shadow-lg rounded-xl">
            <CardHeader><CardTitle>Un-Approved Users List</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Show</span>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-20"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm">entries</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="search-users" className="text-sm">Search:</label>
                        <Input id="search-users" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead><div className="flex items-center">User <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Mobile <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">email <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Date <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Balance <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Betting <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Transfer <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead><div className="flex items-center">Active <ArrowUpDown className="ml-2 h-4 w-4"/></div></TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.user}</TableCell>
                                    <TableCell>{user.mobile}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.date}</TableCell>
                                    <TableCell>{user.balance}</TableCell>
                                    <TableCell><Badge variant="destructive">{user.betting}</Badge></TableCell>
                                    <TableCell><Badge variant="destructive">{user.transfer}</Badge></TableCell>
                                    <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">{user.active}</Badge></TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleViewUser(user.id)}>
                                            <Eye className="h-5 w-5 text-blue-600"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default DashboardPage;