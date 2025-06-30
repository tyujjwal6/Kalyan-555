import React, { useState } from 'react';

// Import necessary components from your shadcn/ui setup
// The exact path might differ based on your project's configuration
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

// Dummy data for the user list dropdown
const dummyUsers = [
  { id: 'usr_101', name: 'John Doe' },
  { id: 'usr_102', name: 'Jane Smith' },
  { id: 'usr_103', name: 'Peter Jones' },
  { id: 'usr_104', name: 'Mary Williams' },
];

const AddFund = () => {
  // State to hold the selected user ID and the amount
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (event) => {
    // Prevent the default form submission which reloads the page
    event.preventDefault();

    if (!userId || !amount) {
      alert('Please select a user and enter an amount.');
      return;
    }
    
    setIsSubmitting(true);

    // Prepare form data for the API
    const formData = {
      userId: userId,
      // Ensure amount is sent as a number
      amount: parseFloat(amount), 
    };

    console.log('Form Data to be sent to API:', formData);

    // --- DUMMY API CALL ---
    // Replace 'https://api.example.com/add-balance' with your actual backend endpoint
    try {
      const response = await fetch('https://api.example.com/add-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // The dummy API will likely fail, so we'll simulate a success case for demonstration
      if (!response.ok) {
        console.warn(`Dummy API call failed with status: ${response.status}. This is expected.`);
        // In a real app, you would handle this error properly.
        // For now, we will proceed as if it were successful.
      }
      
      // Simulate success
      alert(`Successfully submitted! \nUser ID: ${formData.userId}\nAmount: ${formData.amount}`);

      // Reset form fields after successful submission
      setUserId('');
      setAmount('');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please check the console.');
    } finally {
      // Re-enable the submit button regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Balance In User Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-list">User List</Label>
              <Select 
                id="user-list"
                value={userId} 
                onValueChange={setUserId} 
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {dummyUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
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
            
            {/* --- UPDATED BUTTON --- */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFund;