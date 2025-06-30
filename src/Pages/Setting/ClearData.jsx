import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster, toast } from 'sonner';

/**
 * ClearData Component
 * 
 * Provides an interface for an admin to download or clear historical data up to a specified date.
 * Each action is handled independently and communicates with a dummy API.
 */
const ClearData = () => {
  // Set the initial date to match the screenshot "30-06-2025"
  const [date, setDate] = useState(new Date("2025-06-30T12:00:00Z"));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  /**
   * Generic handler for all button actions.
   * @param {string} actionType - A unique identifier for the action (e.g., 'downloadBid', 'cleanData').
   * @param {string} actionName - A user-friendly name for the action used in notifications.
   */
  const handleAction = (actionType, actionName) => {
    if (!date) {
      toast.error("Please select a date before proceeding.");
      return;
    }

    // Use Sonner's promise toast for a great UX during API calls
    const promise = () => new Promise(async (resolve, reject) => {
      // Prepare the data payload in a backend-friendly format
      const payload = {
        action: actionType,
        dateTo: format(date, "yyyy-MM-dd"), // Standard ISO-like format is best for APIs
      };
      
      try {
        // Simulate hitting a dummy API endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(`API Response for ${actionName}:`, responseData);
          resolve(responseData);
        } else {
          // This will trigger the error state of the toast
          reject(new Error('API submission failed'));
        }
      } catch (error) {
        console.error(`Failed to ${actionName}:`, error);
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: `${actionName}...`,
      success: `The '${actionName}' process has been initiated successfully.`,
      error: `Failed to initiate '${actionName}'. Please try again.`,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" richColors />
      <Card className="w-full max-w-5xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-gray-800">Clear Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            {/* Date Picker Section */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date-to" className="text-base font-semibold text-gray-800">
                Date To
              </Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-to"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal h-11 text-base",
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
                    onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setIsPopoverOpen(false); // Close popover on date selection
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Action Buttons */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base"
              onClick={() => handleAction('download_bid_history', 'Download Bid History')}
            >
              Download Bid History
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base"
              onClick={() => handleAction('download_wallet_history', 'Download Wallet History')}
            >
              Download Wallet History
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base"
              onClick={() => handleAction('clear_data', 'Clean Data')}
            >
              Clean Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClearData;