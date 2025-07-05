import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Import necessary components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User, Gamepad2, Tag, Eye, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- Reusable Components with Enhanced Mobile-First Font Sizes ---

const StatCard = ({ title, value, icon, color, to }) => (
  <Link to={to} className="transform transition-transform hover:scale-105">
    <Card className={`${color} text-white shadow-lg rounded-2xl`}>
      <CardContent className="p-4 sm:p-6 flex items-center justify-between">
        <div>
          {/* Enhanced mobile text size */}
          <div className="text-lg sm:text-base lg:text-lg font-medium">{title}</div>
          <div className="text-4xl sm:text-3xl lg:text-4xl font-bold mt-1">{value}</div>
        </div>
        <div className="bg-white/20 p-3 sm:p-4 rounded-full">
          {React.cloneElement(icon, { className: "h-7 w-7 sm:h-6 sm:w-6 lg:h-8 lg:w-8"})}
        </div>
      </CardContent>
    </Card>
  </Link>
);

const AnkCard = ({ ankNumber, bids, amount, color }) => (
  <Link to={`/bid-history?ank=${ankNumber}`} className="transform transition-transform hover:scale-105">
    <Card className="shadow-md rounded-xl overflow-hidden">
      <CardHeader className="p-3 sm:p-2 lg:p-3 bg-white border-b">
        {/* Enhanced mobile text size */}
        <CardTitle className="text-base sm:text-sm lg:text-base font-semibold text-center text-gray-600">
          Total Bids {bids}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-2 lg:p-3 text-center">
        <div className="text-4xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          {amount.toLocaleString()}
        </div>
        <p className="text-base sm:text-sm lg:text-base text-gray-500 mt-1">Total Bid Amount</p>
      </CardContent>
      <div className={`${color} text-white text-center py-2 sm:py-1.5 lg:py-2 text-base sm:text-sm lg:text-base font-semibold`}>
        Ank {ankNumber}
      </div>
    </Card>
  </Link>
);

const DashboardPage = () => {
  // State and handlers remain unchanged
  const [marketBidGame, setMarketBidGame] = useState('');
  const [marketBidAmount, setMarketBidAmount] = useState('N/A');
  const [isMarketBidLoading, setIsMarketBidLoading] = useState(false);
  const [singleAnkGame, setSingleAnkGame] = useState('');
  const [marketTime, setMarketTime] = useState('');
  const [isAnkLoading, setIsAnkLoading] = useState(false);
  const [ankData, setAnkData] = useState([
    { ank: 0, bids: 0, amount: 0, color: 'bg-blue-500' }, { ank: 1, bids: 0, amount: 0, color: 'bg-green-500' },
    { ank: 2, bids: 0, amount: 0, color: 'bg-sky-500' }, { ank: 3, bids: 0, amount: 0, color: 'bg-yellow-500' },
    { ank: 4, bids: 0, amount: 0, color: 'bg-purple-500' }, { ank: 5, bids: 0, amount: 0, color: 'bg-orange-500' },
    { ank: 6, bids: 0, amount: 0, color: 'bg-pink-500' }, { ank: 7, bids: 0, amount: 0, color: 'bg-indigo-500' },
    { ank: 8, bids: 0, amount: 0, color: 'bg-red-500' }, { ank: 9, bids: 0, amount: 0, color: 'bg-teal-500' },
  ]);
  const [unapprovedUsers, setUnapprovedUsers] = useState([
    { id: 1, user: 'Sandip Kumar', mobile: '7029828702', email: 'temp@gmail.com', date: '04 Jul 2025', balance: 9, betting: 'No', transfer: 'No', active: 'Yes' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMarketBidSelect = (gameName) => {
    setMarketBidGame(gameName);
    setIsMarketBidLoading(true);
    setMarketBidAmount('Loading...');
    setTimeout(() => {
      const randomAmount = Math.floor(Math.random() * 50000) + 10000;
      setMarketBidAmount(`₹${randomAmount.toLocaleString()}`);
      setIsMarketBidLoading(false);
    }, 1500);
  };

  const handleGetBids = (e) => {
    e.preventDefault();
    if (!singleAnkGame || !marketTime) {
      alert("Please select both a Game Name and a Market Time.");
      return;
    }
    setIsAnkLoading(true);
    setTimeout(() => {
      const newAnkData = ankData.map(item => ({
        ...item,
        bids: Math.floor(Math.random() * 100),
        amount: Math.floor(Math.random() * 5000),
      }));
      setAnkData(newAnkData);
      setIsAnkLoading(false);
    }, 1500);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const filteredUsers = useMemo(() =>
    unapprovedUsers.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ), [unapprovedUsers, searchTerm]
  );

  return (
    <>
      {/* Enhanced mobile padding and spacing */}
      <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8">
        {/* Enhanced mobile header with better text sizing */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-2">
          <h1 className="text-2xl sm:text-xl lg:text-2xl font-bold text-gray-800">DASHBOARD</h1>
          <div className="text-lg sm:text-sm lg:text-base text-gray-500">Dashboards / Dashboard</div>
        </header>
        
        <main className="space-y-8">
          {/* Enhanced grid spacing for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Users" value="1051" icon={<User />} color="bg-pink-600" to="/user-management" />
            <StatCard title="Games" value="22" icon={<Gamepad2 />} color="bg-blue-600" to="/game-name-3" />
            <StatCard title="Bid Amount" value="200" icon={<Tag />} color="bg-rose-500" to="/bid-history" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-lg lg:text-xl">Market Bid Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="market-game-name" className="block text-lg sm:text-sm lg:text-base font-medium text-gray-700 mb-2">
                    Game Name
                  </label>
                  <Select id="market-game-name" onValueChange={handleMarketBidSelect}>
                    <SelectTrigger className="h-12 sm:h-10 lg:h-12 text-lg sm:text-sm lg:text-base">
                      <SelectValue placeholder="-Select Game Name-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kalyan Morning" className="text-lg sm:text-sm lg:text-base">
                        Kalyan Morning
                      </SelectItem>
                      <SelectItem value="Milan Day" className="text-lg sm:text-sm lg:text-base">
                        Milan Day
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-6">
                  <div className="text-5xl sm:text-4xl lg:text-5xl font-bold text-gray-800 h-16 sm:h-14 lg:h-16 flex items-center">
                    {isMarketBidLoading ? (
                      <Loader2 className="h-12 w-12 sm:h-10 sm:w-10 lg:h-12 lg:w-12 animate-spin text-gray-400" />
                    ) : (
                      marketBidAmount
                    )}
                  </div>
                  <div className="text-lg sm:text-sm lg:text-base text-gray-500 mt-2">Market Amount</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-lg lg:text-xl leading-tight">
                  Total Bids On Single Ank Of Date 04 Jul 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGetBids} className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="w-full space-y-2">
                    <label htmlFor="ank-game-name" className="block text-lg sm:text-sm lg:text-base font-medium text-gray-700">
                      Game Name
                    </label>
                    <Select id="ank-game-name" onValueChange={setSingleAnkGame}>
                      <SelectTrigger className="h-12 sm:h-10 lg:h-12 text-lg sm:text-sm lg:text-base">
                        <SelectValue placeholder="-Select Game Name-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="game1" className="text-lg sm:text-sm lg:text-base">Game One</SelectItem>
                        <SelectItem value="game2" className="text-lg sm:text-sm lg:text-base">Game Two</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-2">
                    <label htmlFor="market-time" className="block text-lg sm:text-sm lg:text-base font-medium text-gray-700">
                      Market Time
                    </label>
                    <Select id="market-time" onValueChange={setMarketTime}>
                      <SelectTrigger className="h-12 sm:h-10 lg:h-12 text-lg sm:text-sm lg:text-base">
                        <SelectValue placeholder="-Select Market Time-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open" className="text-lg sm:text-sm lg:text-base">Open</SelectItem>
                        <SelectItem value="close" className="text-lg sm:text-sm lg:text-base">Close</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto shrink-0 h-12 sm:h-10 lg:h-12 text-lg sm:text-sm lg:text-base font-medium px-6" 
                    disabled={isAnkLoading}
                  >
                    {isAnkLoading ? <Loader2 className="h-5 w-5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 animate-spin"/> : 'Get'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Enhanced mobile grid with better spacing */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 lg:gap-6">
            {ankData.map(data => (
              <AnkCard 
                key={data.ank} 
                ankNumber={data.ank} 
                bids={data.bids} 
                amount={data.amount} 
                color={data.color} 
              />
            ))}
          </div>
          
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-lg lg:text-xl">Un-Approved Users List</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Enhanced mobile controls with better text sizing */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto text-lg sm:text-sm lg:text-base">
                  <span>Show</span>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-20 h-10 sm:h-8 lg:h-10 text-lg sm:text-sm lg:text-base">
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10" className="text-lg sm:text-sm lg:text-base">10</SelectItem>
                      <SelectItem value="25" className="text-lg sm:text-sm lg:text-base">25</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>entries</span>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto text-lg sm:text-sm lg:text-base">
                  <label htmlFor="search-users" className="shrink-0">Search:</label>
                  <Input 
                    id="search-users" 
                    type="search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 sm:h-8 lg:h-10 text-lg sm:text-sm lg:text-base"
                  />
                </div>
              </div>

              {/* Enhanced table with better mobile text sizing */}
              <div className="overflow-x-auto">
                <Table className="min-w-full text-base sm:text-sm lg:text-base">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">#</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">User</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Mobile</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Email</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Date</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Balance</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Betting</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Transfer</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Active</TableHead>
                      <TableHead className="text-base sm:text-sm lg:text-base font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-base sm:text-sm lg:text-base">{user.id}</TableCell>
                        <TableCell className="whitespace-nowrap text-base sm:text-sm lg:text-base font-medium">
                          {user.user}
                        </TableCell>
                        <TableCell className="text-base sm:text-sm lg:text-base">{user.mobile}</TableCell>
                        <TableCell className="text-base sm:text-sm lg:text-base">{user.email}</TableCell>
                        <TableCell className="text-base sm:text-sm lg:text-base">{user.date}</TableCell>
                        <TableCell className="text-base sm:text-sm lg:text-base font-medium">
                          ₹{user.balance}
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-sm sm:text-xs lg:text-sm">
                            {user.betting}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-sm sm:text-xs lg:text-sm">
                            {user.transfer}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm sm:text-xs lg:text-sm">
                            {user.active}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewUser(user)}
                            className="h-10 w-10 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                          >
                            <Eye className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600"/>
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

      {/* Enhanced modal with better mobile text sizing */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-lg lg:text-xl">
              User Details: {selectedUser?.user}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-lg sm:text-base lg:text-lg">
            <div className="flex justify-between items-center">
              <span>ID:</span> 
              <span className="font-medium">{selectedUser?.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Mobile:</span> 
              <span className="font-medium">{selectedUser?.mobile}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Email:</span> 
              <span className="font-medium">{selectedUser?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Date Joined:</span> 
              <span className="font-medium">{selectedUser?.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Balance:</span> 
              <span className="font-medium">₹{selectedUser?.balance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Betting Allowed:</span> 
              <Badge variant="destructive" className="text-sm sm:text-xs lg:text-sm">
                {selectedUser?.betting}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-lg sm:text-base lg:text-lg h-12 sm:h-10 lg:h-12">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardPage;