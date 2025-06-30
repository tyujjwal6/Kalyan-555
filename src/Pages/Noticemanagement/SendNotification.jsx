import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Toaster, toast } from 'sonner'; // <-- Import Sonner's Toaster and toast function
import { Lightbulb } from 'lucide-react';

// Mock data for the user list. In a real application, this would come from an API.
const mockUsers = [
  { id: 'user_1', name: 'Alice' },
  { id: 'user_2', name: 'Bob' },
  { id: 'user_3', name: 'Charlie' },
  { id: 'user_4', name: 'Diana' },
];

/**
 * SendNotification Component
 * 
 * A form for composing and sending a notification to users.
 * Features a user selector, title, and a content field with embedded tools.
 * Submits the composed notification to a dummy API and uses Sonner for notifications.
 */
const SendNotification = () => {
  const [targetUser, setTargetUser] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!targetUser || !noticeTitle || !notificationContent) {
      // Use Sonner's toast.error for validation
      toast.error("Validation Error", {
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      target: targetUser,
      title: noticeTitle,
      content: notificationContent,
      sentAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const responseData = await response.json();
      console.log('API Response:', responseData);
      
      // Use Sonner's toast.success
      toast.success("Success!", {
        description: "Your notification has been sent successfully.",
      });

      setTargetUser('');
      setNoticeTitle('');
      setNotificationContent('');

    } catch (error) {
      console.error('Submission failed:', error);
      // Use Sonner's toast.error for API failures
      toast.error("Submission Failed", {
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Sonner's Toaster component. It can be placed anywhere, but root layout is common. */}
      <Toaster position="top-right" richColors />
      
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Send Notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-list" className="font-medium">User List</Label>
              <Select id="user-list" value={targetUser} onValueChange={setTargetUser} disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectLabel className="px-2 py-1.5 text-xs font-semibold">Individual Users</SelectLabel>
                    {mockUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notice-title" className="font-medium">Notice Title</Label>
              <Input
                id="notice-title"
                type="text"
                placeholder="Enter Title"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-content" className="font-medium">Notification Content</Label>
              <div className="relative">
                <Textarea
                  id="notification-content"
                  placeholder="Type your notification content here."
                  className="min-h-[150px] pr-24"
                  value={notificationContent}
                  onChange={(e) => setNotificationContent(e.target.value)}
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
                    title="Suggestion"
                  >
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200"
                    title="Google"
                  >
                    <span className="font-bold text-sm select-none">G</span>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 w-28">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendNotification;