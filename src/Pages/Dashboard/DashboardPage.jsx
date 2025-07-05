import React, { useState, useMemo } from 'react';

// Import necessary components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// --- Custom Table Components ---
const Table = ({ className, children }) => (
  <div className={`w-full overflow-auto ${className}`}>
    <table className="w-full caption-bottom text-sm">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
);

const TableBody = ({ children }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
);

const TableRow = ({ children }) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    {children}
  </tr>
);

const TableHead = ({ className, children }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ className, children }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

// --- Reusable Components with Mobile-First Font Sizes ---

const StatCard = ({ title, value, icon, color, to }) => (
  <div className="transform transition-transform hover:scale-105 cursor-pointer">
    <Card className={`${color} text-white shadow-lg rounded-2xl`}>
      <CardContent className="p-4 sm:p-6 flex items-center justify-between">
        <div>
          {/* Mobile-first: text-lg on mobile, text-base on desktop */}
          <div className="text-lg sm:text-base font-medium">{title}</div>
          <div className="text-4xl sm:text-3xl lg:text-4xl font-bold">{value}</div>
        </div>
        <div className="bg-white/20 p-3 sm:p-4 rounded-full">
          {React.cloneElement(icon, { className: "h-7 w-7 sm:h-6 sm:w-6 lg:h-8 lg:w-8"})}
        </div>
      </CardContent>
    </Card>
  </div>
);

const AnkCard = ({ ankNumber, bids, amount, color }) => (
  <div className="transform transition-transform hover:scale-105 cursor-pointer">
    <Card className="shadow-md rounded-xl overflow-hidden">
      <CardHeader className="p-3 sm:p-2 lg:p-3 bg-white border-b">
        {/* Mobile-first: text-base on mobile, text-sm on desktop */}
        <CardTitle className="text-base sm:text-sm font-semibold text-center text-gray-600">Total Bids {bids}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-2 lg:p-3 text-center">
        <div className="text-4xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{amount.toLocaleString()}</div>
        {/* Mobile-first: text-base on mobile, text-sm on desktop */}
        <p className="text-base sm:text-sm text-gray-500">Total Bid Amount</p>
      </CardContent>
      <div className={`${color} text-white text-center py-2 sm:py-1 lg:py-1.5 text-base sm:text-sm font-semibold`}>
        Ank {ankNumber}
      </div>
    </Card>
  </div>
);

const DashboardPage = () => {
  // State and handlers
  const [marketBidGame, setMarketBidGame] = useState('');
  const [marketBidAmount, setMarketBidAmount] = useState('N/A');
  const [isMarketBidLoading, setIsMarketBidLoading] = useState(false);
  const [singleAnkGame, setSingleAnkGame] = useState('');
  const [marketTime, setMarketTime] = useState('');
  const [isAnkLoading, setIsAnkLoading] = useState(false);
  const [ankData, setAnkData] = useState([
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
      <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          {/* Mobile-first: text-2xl on mobile, text-xl on small screens, text-2xl on desktop */}
          <h1 className="text-2xl sm:text-xl lg:text-2xl font-bold text-gray-800">DASHBOARD</h1>
          {/* Mobile-first: text-lg on mobile, text-sm on desktop */}
          <div className="text-lg sm:text-sm text-gray-500">Dashboards / Dashboard</div>
        </header>
        
        <main className="space-y-8">
          {/* Grid starts with 1 column on mobile, 2 on small screens, 3 on large */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Users" value="1051" icon={<User />} color="bg-pink-600" to="/user-management" />
            <StatCard title="Games" value="22" icon={<Gamepad2 />} color="bg-blue-600" to="/game-name-3" />
            <StatCard title="Bid Amount" value="200" icon={<Tag />} color="bg-rose-500" to="/bid-history" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                {/* Mobile-first: text-xl on mobile, text-lg on desktop */}
                <CardTitle className="text-xl sm:text-lg">Market Bid Details</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mobile-first: text-lg on mobile, text-sm on desktop */}
                <label htmlFor="market-game-name" className="text-lg sm:text-sm font-medium text-gray-700">Game Name</label>
                <Select id="market-game-name" onValueChange={handleMarketBidSelect}>
                  <SelectTrigger className="mt-2 text-lg sm:text-sm h-12 sm:h-auto">
                    <SelectValue placeholder="-Select Game Name-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kalyan Morning">Kalyan Morning</SelectItem>
                    <SelectItem value="Milan Day">Milan Day</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-6">
                  <div className="text-5xl sm:text-4xl lg:text-5xl font-bold text-gray-800 h-16 sm:h-14 lg:h-16 flex items-center">
                    {isMarketBidLoading ? (
                      <Loader2 className="h-12 w-12 sm:h-10 sm:w-10 lg:h-12 lg:w-12 animate-spin text-gray-400" />
                    ) : (
                      marketBidAmount
                    )}
                  </div>
                  {/* Mobile-first: text-lg on mobile, text-sm on desktop */}
                  <div className="text-lg sm:text-sm text-gray-500 mt-1">Market Amount</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                {/* Mobile-first: text-xl on mobile, text-lg on desktop */}
                <CardTitle className="text-xl sm:text-lg leading-tight">Total Bids On Single Ank Of Date 04 Jul 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4" onSubmit={handleGetBids}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                      {/* Mobile-first: text-lg on mobile, text-sm on desktop */}
                      <label htmlFor="ank-game-name" className="text-lg sm:text-sm font-medium text-gray-700">Game Name</label>
                      <Select id="ank-game-name" onValueChange={setSingleAnkGame}>
                        <SelectTrigger className="mt-2 text-lg sm:text-sm h-12 sm:h-auto">
                          <SelectValue placeholder="-Select Game Name-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="game1">Game One</SelectItem>
                          <SelectItem value="game2">Game Two</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      {/* Mobile-first: text-lg on mobile, text-sm on desktop */}
                      <label htmlFor="market-time" className="text-lg sm:text-sm font-medium text-gray-700">Market Time</label>
                      <Select id="market-time" onValueChange={setMarketTime}>
                        <SelectTrigger className="mt-2 text-lg sm:text-sm h-12 sm:h-auto">
                          <SelectValue placeholder="-Select Market Time-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="close">Close</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={handleGetBids} 
                    className="bg-blue-600 hover:bg-blue-700 w-full text-lg sm:text-base h-12 sm:h-auto" 
                    disabled={isAnkLoading}
                  >
                    {isAnkLoading ? <Loader2 className="h-5 w-5 animate-spin"/> : 'Get'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {ankData.map(data => (
              <AnkCard key={data.ank} ankNumber={data.ank} bids={data.bids} amount={data.amount} color={data.color} />
            ))}
          </div>
          
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              {/* Mobile-first: text-xl on mobile, text-lg on desktop */}
              <CardTitle className="text-xl sm:text-lg">Un-Approved Users List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto text-lg sm:text-sm">
                  <span>Show</span>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-20 text-lg sm:text-sm h-12 sm:h-auto">
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>entries</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto text-lg sm:text-sm">
                  <label htmlFor="search-users" className="shrink-0">Search:</label>
                  <Input 
                    id="search-users" 
                    type="search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-lg sm:text-sm h-12 sm:h-auto"
                  />
                </div>
              </div>

              {/* Horizontal scroll wrapper for table */}
              <div className="overflow-x-auto">
                {/* Mobile-first: text-base on mobile, text-sm on desktop */}
                <Table className="text-base sm:text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base sm:text-sm">#</TableHead>
                      <TableHead className="text-base sm:text-sm">User</TableHead>
                      <TableHead className="text-base sm:text-sm">Mobile</TableHead>
                      <TableHead className="text-base sm:text-sm">Email</TableHead>
                      <TableHead className="text-base sm:text-sm">Date</TableHead>
                      <TableHead className="text-base sm:text-sm">Balance</TableHead>
                      <TableHead className="text-base sm:text-sm">Betting</TableHead>
                      <TableHead className="text-base sm:text-sm">Transfer</TableHead>
                      <TableHead className="text-base sm:text-sm">Active</TableHead>
                      <TableHead className="text-base sm:text-sm">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-base sm:text-sm">{user.id}</TableCell>
                        <TableCell className="text-base sm:text-sm">{user.user}</TableCell>
                        <TableCell className="text-base sm:text-sm">{user.mobile}</TableCell>
                        <TableCell className="text-base sm:text-sm">{user.email}</TableCell>
                        <TableCell className="text-base sm:text-sm">{user.date}</TableCell>
                        <TableCell className="text-base sm:text-sm">{user.balance}</TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-sm sm:text-xs">{user.betting}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-sm sm:text-xs">{user.transfer}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm sm:text-xs">{user.active}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleViewUser(user)} className="h-10 w-10 sm:h-8 sm:w-8">
                            <Eye className="h-6 w-6 sm:h-4 sm:w-4 text-blue-600"/>
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

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            {/* Mobile-first: text-xl on mobile, text-lg on desktop */}
            <DialogTitle className="text-xl sm:text-lg">User Details: {selectedUser?.user}</DialogTitle>
          </DialogHeader>
          {/* Mobile-first: text-lg on mobile, text-base on desktop */}
          <div className="grid gap-3 py-4 text-lg sm:text-base">
            <div className="flex justify-between"><span>ID:</span> <span className="font-medium">{selectedUser?.id}</span></div>
            <div className="flex justify-between"><span>Mobile:</span> <span className="font-medium">{selectedUser?.mobile}</span></div>
            <div className="flex justify-between"><span>Email:</span> <span className="font-medium">{selectedUser?.email}</span></div>
            <div className="flex justify-between"><span>Date Joined:</span> <span className="font-medium">{selectedUser?.date}</span></div>
            <div className="flex justify-between"><span>Balance:</span> <span className="font-medium">₹{selectedUser?.balance}</span></div>
            <div className="flex justify-between items-center">
              <span>Betting Allowed:</span> 
              <Badge variant="destructive" className="text-sm sm:text-xs">{selectedUser?.betting}</Badge>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-lg sm:text-base h-12 sm:h-auto">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardPage;