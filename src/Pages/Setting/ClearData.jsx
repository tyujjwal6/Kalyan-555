import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Trash2, Loader2 } from "lucide-react";

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
// --- NEW: Import Dialog components ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";


// --- NEW: Reusable Confirmation Modal ---
const ActionConfirmationModal = ({ isOpen, onOpenChange, action, date, onConfirm, isSubmitting }) => {
  const isDestructive = action.type === 'clear_data';
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={cn(isDestructive && "text-red-600")}>
            Confirm: {action.name}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to perform this action for all data up to and including <span className="font-semibold">{format(date, "dd-MM-yyyy")}</span>? 
            {isDestructive && <span className="font-bold text-red-500 block mt-2">This action cannot be undone.</span>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button
            variant={isDestructive ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm & Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ClearData = () => {
  const [date, setDate] = useState(new Date("2025-06-30T12:00:00Z"));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // --- NEW: State for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAction, setCurrentAction] = useState({ type: '', name: '' });

  // --- NEW: Function to open the confirmation modal ---
  const handleActionClick = (actionType, actionName) => {
    if (!date) {
      toast.error("Please select a date before proceeding.");
      return;
    }
    setCurrentAction({ type: actionType, name: actionName });
    setIsModalOpen(true);
  };

  // --- MODAL: The actual submission logic, called from the modal ---
  const handleConfirmAction = () => {
    const { type, name } = currentAction;
    const promise = () => new Promise(async (resolve, reject) => {
      setIsSubmitting(true);
      const payload = { action: type, dateTo: format(date, "yyyy-MM-dd") };
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        console.log(`API Response for ${name}:`, { success: true });
        resolve({ name });
      } catch (error) {
        console.error(`Failed to ${name}:`, error);
        reject(new Error(`Failed to initiate '${name}'. Please try again.`));
      }
    });

    toast.promise(promise, {
      loading: `${name}...`,
      success: (data) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        return `The '${data.name}' process has been initiated successfully.`;
      },
      error: (err) => {
        setIsSubmitting(false);
        return err.message;
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {/* RESPONSIVE: Added padding for different screen sizes */}
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-5xl mx-auto shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-gray-800">Clear Data</CardTitle>
          </CardHeader>
          <CardContent>
            {/* RESPONSIVE: Flex container stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-end gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date-to" className="text-base font-semibold text-gray-800">Date To</Label>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button id="date-to" variant={"outline"} className={cn("w-full sm:w-[240px] justify-start text-left font-normal h-11 text-base",!date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setIsPopoverOpen(false); }} initialFocus /></PopoverContent>
                </Popover>
              </div>

              {/* Action Buttons now open the modal */}
              <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base" onClick={() => handleActionClick('download_bid_history', 'Download Bid History')}>
                <Download className="mr-2 h-4 w-4" /> Download Bid History
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base" onClick={() => handleActionClick('download_wallet_history', 'Download Wallet History')}>
                <Download className="mr-2 h-4 w-4" /> Download Wallet History
              </Button>
              <Button variant="destructive" className="h-11 px-6 text-base" onClick={() => handleActionClick('clear_data', 'Clean Data')}>
                <Trash2 className="mr-2 h-4 w-4" /> Clean Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MODAL: The single, reusable confirmation modal --- */}
      <ActionConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        action={currentAction}
        date={date}
        onConfirm={handleConfirmAction}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default ClearData;