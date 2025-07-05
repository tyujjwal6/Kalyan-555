import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Import necessary components from shadcn/ui and lucide-react
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User, Gamepad2, Tag, Eye, ArrowUpDown, Loader2 } from 'lucide-react';
// Import Dialog components for the modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// --- Reusable Components (with responsive text size) ---

const StatCard = ({ title, value, icon, color, to }) => (
  <Link to={to} className="transform transition-transform hover:scale-105">
    <Card className={`${color} text-white shadow-lg rounded-2xl`}>
      {/* --- RESPONSIVE: Adjusted padding for mobile --- */}
      <CardContent className="p-4 sm:p-6 flex items-center justify-between">
        <div>
          {/* --- RESPONSIVE: Adjusted font sizes for mobile --- */}
          <div className="text-base sm:text-lg font-medium">{title}</div>
          <div className="text-3xl sm:text-4xl font-bold">{value}</div>
        </div>
        <div className="bg-white/20 p-3 sm:p-4 rounded-full">
          {/* --- RESPONSIVE: Adjusted icon size for mobile --- */}
          {React.cloneElement(icon, { className: "h-6 w-6 sm:h-8 sm:w-8"})}
        </div>
      </CardContent>
    </Card>
  </Link>
);

const AnkCard = ({ ankNumber, bids, amount, color }) => (
  <Link to={`/bid-history?ank=${ankNumber}`} className="transform transition-transform hover:scale-105">
    <Card className="shadow-md rounded-xl overflow-hidden">
      <CardHeader className="p-2 sm:p-3 bg-white border-b">
        {/* --- RESPONSIVE: Smaller title text on mobile --- */}
        <CardTitle className="text-xs sm:text-sm font-semibold text-center text-gray-600">Total Bids {bids}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 text-center">
        {/* --- RESPONSIVE: Smaller amount text on mobile --- */}
        <div className="text-3xl sm:text-4xl font-bold text-gray-800">{amount.toLocaleString()}</div>
        <p className="text-xs text-gray-500">Total Bid Amount</p>
      </CardContent>
      <div className={`${color} text-white text-center py-1 sm:py-1.5 text-sm font-semibold`}>
        Ank {ankNumber}
      </div>
    </Card>
  </Link>
);


const DashboardPage = () => {
  // State for forms and API interactions (No changes here)
  const [marketBidGame, setMarketBidGame] = useState('');
  const [marketBidAmount, setMarketBidAmount] = useState('N/A');
  const [isMarketBidLoading, setIsMarketBidLoading] = useState(false);
  
  const [singleAnkGame, setSingleAnkGame] = useState('');
  const [marketTime, setMarketTime] = useState('');
  const [isAnkLoading, setIsAnkLoading] = useState(false);

  // State for the "Ank" cards data (No changes here)
  const [ankData, setAnkData] = useState([
    { ank: 0, bids: 0, amount: 0, color: 'bg-blue-500' }, { ank: 1, bids: 0, amount: 0, color: 'bg-green-500' },
    { ank: 2, bids: 0, amount: 0, color: 'bg-sky-500' }, { ank: 3, bids: 0, amount: 0, color: 'bg-yellow-500' },
    { ank: 4, bids: 0, amount: 0, color: 'bg-purple-500' }, { ank: 5, bids: 0, amount: 0, color: 'bg-orange-500' },
    { ank: 6, bids: 0, amount: 0, color: 'bg-pink-500' }, { ank: 7, bids: 0, amount: 0, color: 'bg-indigo-500' },
    { ank: 8, bids: 0, amount: 0, color: 'bg-red-500' }, { ank: 9, bids: 0, amount: 0, color: 'bg-teal-500' },
  ]);

  // State for the user table and modal (No changes here)
  const [unapprovedUsers, setUnapprovedUsers] = useState([
    { id: 1, user: 'Sandip Kumar', mobile: '7029828702', email: 'temp@gmail.com', date: '04 Jul 2025', balance: 9, betting: 'No', transfer: 'No', active: 'Yes' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // --- API Handlers (No changes here) ---

  const handleMarketBidSelect = (gameName) => {
    setMarketBidGame(gameName);
    setIsMarketBidLoading(true);
    setMarketBidAmount('Loading...');
    
    console.log("Fetching Market Bid Details for:", gameName);
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
    console.log("Fetching Bids for Single Ank:", { singleAnkGame, marketTime });
    
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
      {/* --- RESPONSIVE: Padding is already responsive, which is great. --- */}
      <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          {/* --- RESPONSIVE: Smaller header text on mobile --- */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">DASHBOARD</h1>
          <div className="text-sm text-gray-500">Dashboards / Dashboard</div>
        </header>
        
        <main className="space-y-8">
          {/* --- RESPONSIVE: The grid columns are already responsive. Perfect. --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Users" value="1051" icon={<User />} color="bg-pink-600" to="/user-management" />
            <StatCard title="Games" value="22" icon={<Gamepad2 />} color="bg-blue-600" to="/game-name-3" />
            <StatCard title="Bid Amount" value="200" icon={<Tag />} color="bg-rose-500" to="/bid-history" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader><CardTitle>Market Bid Details</CardTitle></CardHeader>
              <CardContent>
                <label htmlFor="market-game-name" className="text-sm font-medium text-gray-700">Game Name</label>
                <Select id="market-game-name" onValueChange={handleMarketBidSelect}>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger>
                  <SelectContent><SelectItem value="Kalyan Morning">Kalyan Morning</SelectItem><SelectItem value="Milan Day">Milan Day</SelectItem></SelectContent>
                </Select>
                <div className="mt-6">
                  {/* --- RESPONSIVE: Smaller text and height on mobile for the large amount display --- */}
                  <div className="text-4xl sm:text-5xl font-bold text-gray-800 h-14 sm:h-16 flex items-center">
                    {isMarketBidLoading ? <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-gray-400" /> : marketBidAmount}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Market Amount</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader><CardTitle>Total Bids On Single Ank Of Date 04 Jul 2025</CardTitle></CardHeader>
              <CardContent>
                {/* --- RESPONSIVE: The form already stacks on mobile (`flex-col sm:flex-row`). Perfect. --- */}
                <form onSubmit={handleGetBids} className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="w-full">
                    <label htmlFor="ank-game-name" className="text-sm font-medium text-gray-700">Game Name</label>
                    <Select id="ank-game-name" onValueChange={setSingleAnkGame}><SelectTrigger className="mt-2"><SelectValue placeholder="-Select Game Name-" /></SelectTrigger><SelectContent><SelectItem value="game1">Game One</SelectItem><SelectItem value="game2">Game Two</SelectItem></SelectContent></Select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="market-time" className="text-sm font-medium text-gray-700">Market Time</label>
                    <Select id="market-time" onValueChange={setMarketTime}><SelectTrigger className="mt-2"><SelectValue placeholder="-Select Market Time-" /></SelectTrigger><SelectContent><SelectItem value="open">Open</SelectItem><SelectItem value="close">Close</SelectItem></SelectContent></Select>
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto shrink-0" disabled={isAnkLoading}>
                    {isAnkLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Get'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* --- RESPONSIVE: Grid starts with 2 columns on mobile and expands. Perfect. --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {ankData.map(data => (
                <AnkCard key={data.ank} ankNumber={data.ank} bids={data.bids} amount={data.amount} color={data.color} />
            ))}
          </div>
          
          <Card className="shadow-lg rounded-xl">
            <CardHeader><CardTitle>Un-Approved Users List</CardTitle></CardHeader>
            <CardContent>
              {/* --- RESPONSIVE: The search/show entries controls already stack on mobile. Perfect. --- */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                      <span className="text-sm">Show</span>
                      <Select defaultValue="10"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem></SelectContent></Select>
                      <span className="text-sm">entries</span>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                      <label htmlFor="search-users" className="text-sm shrink-0">Search:</label>
                      <Input id="search-users" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
              </div>
              {/* --- RESPONSIVE: This is the key for tables. It makes the table horizontally scrollable on small screens, preventing layout breakage. --- */}
              <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>User</TableHead><TableHead>Mobile</TableHead><TableHead>email</TableHead>
                            <TableHead>Date</TableHead><TableHead>Balance</TableHead><TableHead>Betting</TableHead>
                            <TableHead>Transfer</TableHead><TableHead>Active</TableHead><TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell><TableCell>{user.user}</TableCell><TableCell>{user.mobile}</TableCell>
                                <TableCell>{user.email}</TableCell><TableCell>{user.date}</TableCell><TableCell>{user.balance}</TableCell>
                                <TableCell><Badge variant="destructive">{user.betting}</Badge></TableCell>
                                <TableCell><Badge variant="destructive">{user.transfer}</Badge></TableCell>
                                <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">{user.active}</Badge></TableCell>
                                <TableCell><Button variant="ghost" size="icon" onClick={() => handleViewUser(user)}><Eye className="h-5 w-5 text-blue-600"/></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* User Detail Modal (shadcn Dialog is inherently responsive) */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details: {selectedUser?.user}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4 text-sm">
            <div className="flex justify-between"><span>ID:</span> <span className="font-medium">{selectedUser?.id}</span></div>
            <div className="flex justify-between"><span>Mobile:</span> <span className="font-medium">{selectedUser?.mobile}</span></div>
            <div className="flex justify-between"><span>Email:</span> <span className="font-medium">{selectedUser?.email}</span></div>
            <div className="flex justify-between"><span>Date Joined:</span> <span className="font-medium">{selectedUser?.date}</span></div>
            <div className="flex justify-between"><span>Balance:</span> <span className="font-medium">₹{selectedUser?.balance}</span></div>
            <div className="flex justify-between"><span>Betting Allowed:</span> <Badge variant="destructive">{selectedUser?.betting}</Badge></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export  default DashboardPage;