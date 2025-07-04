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
import { Toaster, toast } from 'sonner';
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


// A reusable FormField component
const FormField = ({ label, example, isOptional = false, htmlFor, children }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={htmlFor} className="flex flex-wrap items-baseline gap-x-2 text-base font-semibold text-gray-800">
      {label}
      {isOptional && <span className="text-gray-500 font-normal text-sm">(Optional)</span>}
      {example && <span className="text-red-500 font-normal text-sm">{example}</span>}
    </Label>
    {children}
  </div>
);

// --- FIX: The definition for ConfirmationModal was missing. It is now added back. ---
const ConfirmationModal = ({ isOpen, onOpenChange, title, data, onConfirm, isSubmitting }) => {
  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm: {title}</DialogTitle>
          <DialogDescription>Please review the changes before submitting.</DialogDescription>
        </DialogHeader>
        <div className="my-4 max-h-60 overflow-y-auto space-y-2 rounded-md border p-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-600">{formatLabel(key)}:</span>
              <span className="font-semibold text-right break-all">
                {typeof value === 'boolean' ? (value ? 'ON' : 'OFF') : value.toString()}
              </span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm & Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ContactSettings = () => {
  const [contactInfo, setContactInfo] = useState({
    mobileNumber: '9079468773', telegramMobile: 'https://t.me/kalyanlivesattabot',
    whatsappNumber: '9079468773', landline1: '', landline2: '',
    email1: 'gmail@gmail.com', email2: 'gmail@gmail.com',
    facebook: 'https://facebook.com/kalyanofficial', twitter: '',
    youtube: 'https://youtube.com/kalyanofficial', googlePlus: '',
    instagram: 'https://instagram.com/kalyanofficial', latitude: '', longitude: '',
    address: 'IN',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setContactInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleOpenConfirmation = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const promise = () => new Promise(async (resolve, reject) => {
      setIsSubmitting(true);
      const payload = { settings: 'contact', data: contactInfo, updatedAt: new Date().toISOString() };
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('API Response for Contact Settings:', responseData);
          resolve(responseData);
        } else {
          reject(new Error('API submission failed'));
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: 'Updating contact settings...',
      success: (data) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        return 'Contact settings updated successfully!';
      },
      error: (err) => {
        console.error('Failed to submit Contact Settings:', err);
        setIsSubmitting(false);
        return 'Failed to update settings. Please try again.';
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-7xl mx-auto shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-gray-800">Contact Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOpenConfirmation}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                <div className="space-y-6">
                  <FormField label="Mobile Number" example="eg. 7906493236" htmlFor="mobileNumber"><Input id="mobileNumber" value={contactInfo.mobileNumber} onChange={handleInputChange} /></FormField>
                  <FormField label="Landline 1" isOptional example="eg. 0141-9999999" htmlFor="landline1"><Input id="landline1" placeholder="Enter Landline Number" value={contactInfo.landline1} onChange={handleInputChange} /></FormField>
                  <FormField label="Email 1" htmlFor="email1"><Input id="email1" type="email" value={contactInfo.email1} onChange={handleInputChange} /></FormField>
                  <FormField label="Facebook" isOptional htmlFor="facebook"><Input id="facebook" value={contactInfo.facebook} onChange={handleInputChange} /></FormField>
                  <FormField label="Youtube" isOptional htmlFor="youtube"><Input id="youtube" value={contactInfo.youtube} onChange={handleInputChange} /></FormField>
                  <FormField label="Instagram" isOptional htmlFor="instagram"><Input id="instagram" value={contactInfo.instagram} onChange={handleInputChange} /></FormField>
                </div>
                <div className="space-y-6">
                  <FormField label="Telegram Mobile" isOptional htmlFor="telegramMobile"><Input id="telegramMobile" value={contactInfo.telegramMobile} onChange={handleInputChange} /></FormField>
                  <FormField label="Landline 2" isOptional htmlFor="landline2"><Input id="landline2" placeholder="Enter Second Landline Number" value={contactInfo.landline2} onChange={handleInputChange} /></FormField>
                  <FormField label="Email 2" isOptional htmlFor="email2"><Input id="email2" type="email" value={contactInfo.email2} onChange={handleInputChange} /></FormField>
                  <FormField label="Twitter" isOptional htmlFor="twitter"><Input id="twitter" placeholder="Enter Twitter Link" value={contactInfo.twitter} onChange={handleInputChange} /></FormField>
                  <FormField label="Google Plus" isOptional htmlFor="googlePlus"><Input id="googlePlus" placeholder="Enter Google Plus Link" value={contactInfo.googlePlus} onChange={handleInputChange} /></FormField>
                  <FormField label="Latitude" htmlFor="latitude"><Input id="latitude" placeholder="Enter Latitude" value={contactInfo.latitude} onChange={handleInputChange} /></FormField>
                </div>
                <div className="space-y-6">
                  <FormField label="WhatsApp Number" htmlFor="whatsappNumber"><Input id="whatsappNumber" value={contactInfo.whatsappNumber} onChange={handleInputChange} /></FormField>
                  <div className="hidden lg:block h-20"></div><div className="hidden lg:block h-20"></div>
                  <div className="hidden lg:block h-20"></div><div className="hidden lg:block h-20"></div>
                  <FormField label="Longitude" htmlFor="longitude"><Input id="longitude" placeholder="Enter Longitude" value={contactInfo.longitude} onChange={handleInputChange} /></FormField>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <FormField label="Address" htmlFor="address"><Textarea id="address" className="min-h-[100px]" value={contactInfo.address} onChange={handleInputChange} /></FormField>
                </div>
              </div>
              
              <div className="mt-8">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Update Contact Settings"
        data={contactInfo}
        onConfirm={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default ContactSettings;