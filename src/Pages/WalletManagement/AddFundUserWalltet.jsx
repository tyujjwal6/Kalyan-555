import React, { useState } from 'react';

// Import necessary components from your shadcn/ui setup
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- NEW IMPORTS for Modals ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

// Dummy data for the user list dropdown
const dummyUsers = [
  { id: 'usr_101', name: 'John Doe' },
  { id: 'usr_102', name: 'Jane Smith' },
  { id: 'usr_103', name: 'Peter Jones' },
  { id: 'usr_104', name: 'Mary Williams' },
];

const AddFund = () => {
  // State for form fields and submission status
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  
  // --- NEW: State for modals and loading ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // This function now opens the confirmation modal instead of submitting directly
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!userId || !amount) {
      setError('Please select a user and enter an amount.');
      return;
    }
    
    // Open the confirmation modal
    setIsConfirmModalOpen(true);
  };

  // This new function handles the actual API call after confirmation
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setError(null); // Clear previous errors

    const formData = {
      userId: userId,
      amount: parseFloat(amount), 
    };
    console.log('Form Data to be sent to API:', formData);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Dummy API call successful!');
      alert(`Successfully added ₹${formData.amount.toLocaleString()} to ${dummyUsers.find(u => u.id === userId)?.name}'s wallet.`);

      // Reset form fields after successful submission
      setUserId('');
      setAmount('');

    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false); // Close the modal
    }
  };

  const selectedUserName = dummyUsers.find(user => user.id === userId)?.name;

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add Balance In User Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user-list">User List</Label>
                <Select id="user-list" value={userId} onValueChange={setUserId} disabled={isSubmitting}>
                  <SelectTrigger><SelectValue placeholder="Select User" /></SelectTrigger>
                  <SelectContent>
                    {dummyUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={isSubmitting}
                  min="0.01"
                  step="0.01"
                />
              </div>
              
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Fund Transfer</DialogTitle>
            <DialogDescription>
              Please review the details below before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User:</span>
              <span className="font-semibold">{selectedUserName}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted-foreground">Amount to Add:</span>
              <span className="font-bold text-xl text-green-600">₹{parseFloat(amount || 0).toLocaleString()}</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Confirming...' : 'Confirm & Add Fund'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Error Modal */}
      <Dialog open={!!error} onOpenChange={() => setError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription className="pt-2">{error}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button type="button">OK</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFund;