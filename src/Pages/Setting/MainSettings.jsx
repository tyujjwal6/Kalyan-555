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
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from 'sonner';
import { Clock } from 'lucide-react';
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
import { Loader2 } from 'lucide-react';


// Reusable FormField component
const FormField = ({ label, htmlFor, children }) => (
  <div className="space-y-2">
    <Label htmlFor={htmlFor} className="text-sm font-semibold text-gray-700">{label}</Label>
    {children}
  </div>
);

// --- NEW: Reusable Confirmation Modal ---
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


const MainSettings = () => {
  // --- NEW: State for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', data: {}, formName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for forms
  const [bankDetails, setBankDetails] = useState({ accountHolder: 'Kalyan Online', accountNumber: '545345', ifscCode: 'vcvbcc' });
  const [appLink, setAppLink] = useState({ link: 'https://play.google.com/store/apps/details?id=com.sara777satta', message: 'Play Best Matka App Online https://sara777satta.com/app/sara777satta.apk' });
  const [upiIds, setUpiIds] = useState({ googlePay: '0793545A0213343.bqr@kotak', phonePe: '0793545A0213343.bqr@kotak', other: '0793545A0213343.bqr@kotak' });
  const [maintenance, setMaintenance] = useState({ message: 'Wait', showMsg: false });
  const [appValues, setAppValues] = useState({ minDeposit: '100', maxDeposit: '100000', minWithdrawal: '1000', maxWithdrawal: '100000', minTransfer: '300', maxTransfer: '50000', minBid: '10', maxBid: '100000', welcomeBonus: '9', openTime: '07:00', closeTime: '10:00', globalBetting: true });

  // --- NEW: Function to open the confirmation modal ---
  const handleOpenConfirmation = (formData, formName) => {
    setModalData({ title: `Update ${formName}`, data: formData, formName });
    setIsModalOpen(true);
  };
  
  // --- NEW: The actual submission logic, called from the modal ---
  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    const { data, formName } = modalData;

    const promise = () => new Promise(async (resolve, reject) => {
        const payload = { form: formName, data, submittedAt: new Date().toISOString() };
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
            });
            if (response.ok) resolve(await response.json());
            else reject();
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: `Updating ${formName}...`,
        success: (res) => {
            console.log(`API Response for ${formName}:`, res);
            setIsSubmitting(false);
            setIsModalOpen(false);
            return `${formName} updated successfully!`;
        },
        error: (err) => {
            console.error(`Failed to submit ${formName}:`, err);
            setIsSubmitting(false);
            return `Failed to update ${formName}.`;
        },
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {/* RESPONSIVE: Padding adjusts for screen size */}
      <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        {/* RESPONSIVE: Grid stacks to 1 column on smaller screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <Card>
            <CardHeader><CardTitle>Add Bank Details</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmation(bankDetails, 'Bank Details'); }} className="space-y-6">
                <FormField label="Account Holder Name" htmlFor="accountHolder"><Input id="accountHolder" value={bankDetails.accountHolder} onChange={e => setBankDetails({...bankDetails, accountHolder: e.target.value})}/></FormField>
                <FormField label="Account Number" htmlFor="accountNumber"><Input id="accountNumber" value={bankDetails.accountNumber} onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})}/></FormField>
                <FormField label="IFSC Code" htmlFor="ifscCode"><Input id="ifscCode" value={bankDetails.ifscCode} onChange={e => setBankDetails({...bankDetails, ifscCode: e.target.value})}/></FormField>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Add App Link</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmation(appLink, 'App Link'); }} className="space-y-6">
                <FormField label="App Link" htmlFor="appLink"><Input id="appLink" value={appLink.link} onChange={e => setAppLink({...appLink, link: e.target.value})}/></FormField>
                <FormField label="Share Message" htmlFor="shareMessage"><Textarea id="shareMessage" className="h-28" value={appLink.message} onChange={e => setAppLink({...appLink, message: e.target.value})}/></FormField>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Add UPI ID</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmation(upiIds, 'UPI IDs'); }} className="space-y-6">
                <FormField label="Google UPI Payment Id" htmlFor="googlePay"><Input id="googlePay" value={upiIds.googlePay} onChange={e => setUpiIds({...upiIds, googlePay: e.target.value})}/></FormField>
                <FormField label="Phone Pe UPI Payment Id" htmlFor="phonePe"><Input id="phonePe" value={upiIds.phonePe} onChange={e => setUpiIds({...upiIds, phonePe: e.target.value})}/></FormField>
                <FormField label="Other UPI Payment Id" htmlFor="otherUpi"><Input id="otherUpi" value={upiIds.other} onChange={e => setUpiIds({...upiIds, other: e.target.value})}/></FormField>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>App Maintenance</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmation(maintenance, 'App Maintenance'); }} className="space-y-6">
                <FormField label="Share Message" htmlFor="maintenanceMessage"><Textarea id="maintenanceMessage" className="h-28" value={maintenance.message} onChange={e => setMaintenance({...maintenance, message: e.target.value})}/></FormField>
                <div className="flex items-center space-x-2"><Switch id="show-msg" checked={maintenance.showMsg} onCheckedChange={checked => setMaintenance({...maintenance, showMsg: checked})}/><Label htmlFor="show-msg" className="text-sm font-medium text-blue-600">Show Msg <span className="text-gray-500">(ON/OFF)</span></Label></div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              </form>
            </CardContent>
          </Card>

          {/* RESPONSIVE: Add Value's form takes full width on large screens */}
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Add Value's</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmation(appValues, 'App Values'); }}>
                {/* RESPONSIVE: Grid stacks to 1 column on mobile, 2 on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <FormField label="Minimum Deposit" htmlFor="minDeposit"><Input id="minDeposit" value={appValues.minDeposit} onChange={e => setAppValues({...appValues, minDeposit: e.target.value})} /></FormField>
                  <FormField label="Maximum Deposit" htmlFor="maxDeposit"><Input id="maxDeposit" value={appValues.maxDeposit} onChange={e => setAppValues({...appValues, maxDeposit: e.target.value})} /></FormField>
                  <FormField label="Minimum Withdrawal" htmlFor="minWithdrawal"><Input id="minWithdrawal" value={appValues.minWithdrawal} onChange={e => setAppValues({...appValues, minWithdrawal: e.target.value})}/></FormField>
                  <FormField label="Maximum Withdrawal" htmlFor="maxWithdrawal"><Input id="maxWithdrawal" value={appValues.maxWithdrawal} onChange={e => setAppValues({...appValues, maxWithdrawal: e.target.value})}/></FormField>
                  <FormField label="Minimum Transfer" htmlFor="minTransfer"><Input id="minTransfer" value={appValues.minTransfer} onChange={e => setAppValues({...appValues, minTransfer: e.target.value})}/></FormField>
                  <FormField label="Maximum Transfer" htmlFor="maxTransfer"><Input id="maxTransfer" value={appValues.maxTransfer} onChange={e => setAppValues({...appValues, maxTransfer: e.target.value})}/></FormField>
                  <FormField label="Minimum Bid Amount" htmlFor="minBid"><Input id="minBid" value={appValues.minBid} onChange={e => setAppValues({...appValues, minBid: e.target.value})}/></FormField>
                  <FormField label="Maximum Bid Amount" htmlFor="maxBid"><Input id="maxBid" value={appValues.maxBid} onChange={e => setAppValues({...appValues, maxBid: e.target.value})}/></FormField>
                  <FormField label="Welcome Bonus" htmlFor="welcomeBonus"><Input id="welcomeBonus" value={appValues.welcomeBonus} onChange={e => setAppValues({...appValues, welcomeBonus: e.target.value})}/></FormField>
                  <FormField label="Withdraw Open Time" htmlFor="openTime"><div className="relative"><Input id="openTime" value={appValues.openTime} onChange={e => setAppValues({...appValues, openTime: e.target.value})} className="pr-8" /><Clock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></FormField>
                  <FormField label="Withdraw Close Time" htmlFor="closeTime"><div className="relative"><Input id="closeTime" value={appValues.closeTime} onChange={e => setAppValues({...appValues, closeTime: e.target.value})} className="pr-8" /><Clock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></FormField>
                  <div className="flex items-center space-x-2 self-end mb-2">
                    <Switch id="global-betting" checked={appValues.globalBetting} onCheckedChange={checked => setAppValues({...appValues, globalBetting: checked})}/>
                    <Label htmlFor="global-betting" className="text-sm font-medium text-blue-600">Global Betting</Label>
                  </div>
                </div>
                <Button type="submit" className="mt-8 bg-blue-600 hover:bg-blue-700">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* --- NEW: The single, reusable modal --- */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalData.title}
        data={modalData.data}
        onConfirm={handleConfirmSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default MainSettings;