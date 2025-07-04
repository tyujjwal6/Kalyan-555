import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- NEW: Import Dialog and Loader ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Toaster, toast } from 'sonner';
import { Lightbulb, Loader2 } from 'lucide-react';

const mockUsers = [
  { id: 'user_1', name: 'Alice' },
  { id: 'user_2', name: 'Bob' },
  { id: 'user_3', name: 'Charlie' },
];

const suggestionTemplates = [
  "Welcome! We're excited to have you on board.",
  "Don't miss out on our special weekend event!",
  "Please update your app to the latest version for new features.",
  "Our services will be temporarily unavailable for scheduled maintenance.",
];

const SendNotification = () => {
  const [targetUser, setTargetUser] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  
  // --- NEW: State for modals and loading ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);

  // --- MODAL: Opens confirmation modal ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetUser || !noticeTitle || !notificationContent) {
      toast.error("Validation Error", { description: "Please fill out all fields before submitting." });
      return;
    }
    setIsConfirmModalOpen(true);
  };
  
  // --- MODAL: Handles the final submission from the modal ---
  const handleConfirmSend = async () => {
    setIsSubmitting(true);
    const payload = { target: targetUser, title: noticeTitle, content: notificationContent, sentAt: new Date().toISOString() };

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      console.log('API Response: Success', payload);
      toast.success("Success!", { description: "Your notification has been sent successfully." });
      setTargetUser(''); setNoticeTitle(''); setNotificationContent('');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error("Submission Failed", { description: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
    }
  };
  
  const handleUseSuggestion = (template) => {
    setNotificationContent(template);
    setIsSuggestionModalOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {/* RESPONSIVE: Added padding for different screen sizes */}
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader><CardTitle className="text-xl font-semibold text-gray-800">Send Notification</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user-list" className="font-medium">User List</Label>
                <Select id="user-list" value={targetUser} onValueChange={setTargetUser} disabled={isSubmitting}>
                  <SelectTrigger><SelectValue placeholder="Select Users" /></SelectTrigger>
                  <SelectContent><SelectGroup><SelectItem value="all">All Users</SelectItem><SelectLabel className="px-2 py-1.5 text-xs font-semibold">Individual Users</SelectLabel>{mockUsers.map(user => (<SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>))}</SelectGroup></SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notice-title" className="font-medium">Notice Title</Label>
                <Input id="notice-title" type="text" placeholder="Enter Title" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} disabled={isSubmitting} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-content" className="font-medium">Notification Content</Label>
                <div className="relative">
                  <Textarea id="notification-content" placeholder="Type your notification content here." className="min-h-[150px] pr-24" value={notificationContent} onChange={(e) => setNotificationContent(e.target.value)} disabled={isSubmitting} />
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    {/* --- MODAL: Buttons now open modals --- */}
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200" title="Suggestion" onClick={() => setIsSuggestionModalOpen(true)}><Lightbulb className="h-4 w-4" /></Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200" title="Google" onClick={() => setIsTranslateModalOpen(true)}><span className="font-bold text-sm select-none">G</span></Button>
                  </div>
                </div>
              </div>

              <div>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-28">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* --- MODALS SECTION --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Confirm Notification</DialogTitle><DialogDescription>Please review your notification before sending.</DialogDescription></DialogHeader>
          <div className="my-4 space-y-4 text-sm">
            <div className="flex justify-between"><span>Target:</span><span className="font-semibold">{targetUser === 'all' ? 'All Users' : mockUsers.find(u => u.id === targetUser)?.name}</span></div>
            <div className="flex justify-between"><span>Title:</span><span className="font-semibold">{noticeTitle}</span></div>
            <div><span>Content:</span><p className="mt-1 p-2 bg-gray-100 rounded-md text-gray-700">{notificationContent}</p></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose><Button onClick={handleConfirmSend} disabled={isSubmitting}>{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Confirm & Send</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isSuggestionModalOpen} onOpenChange={setIsSuggestionModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Notification Templates</DialogTitle><DialogDescription>Click a template to use it as your notification content.</DialogDescription></DialogHeader>
          <div className="py-4 space-y-2">{suggestionTemplates.map((template, index) => (<button key={index} onClick={() => handleUseSuggestion(template)} className="w-full text-left p-2 rounded-md hover:bg-gray-100">{template}</button>))}</div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isTranslateModalOpen} onOpenChange={setIsTranslateModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Translate Content</DialogTitle><DialogDescription>This is a placeholder for a Google Translate integration. In a real application, this modal would allow you to translate your notification content into different languages.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button>Close</Button></DialogClose></DialogFooter></DialogContent>
      </Dialog>
    </>
  );
};

export default SendNotification;