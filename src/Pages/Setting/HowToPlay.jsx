import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Keep for consistency if needed elsewhere
import { Toaster, toast } from 'sonner';
// --- NEW: Import Dialog components and more icons ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Loader2 } from 'lucide-react';


// This is our new RichTextEditor component with enhanced functionality
const RichTextEditor = ({ initialContent, onChange }) => {
  const editorRef = useRef(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };

  const handleInsertLink = (url) => {
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {/* RESPONSIVE: Toolbar wraps on smaller screens */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200 rounded" title="Bold"><Bold size={16} /></button>
        <button type="button" onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200 rounded" title="Italic"><Italic size={16} /></button>
        <button type="button" onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200 rounded" title="Underline"><Underline size={16} /></button>
        <div className="border-l border-gray-300 mx-1 h-6"></div>
        <button type="button" onClick={() => executeCommand('justifyLeft')} className="p-2 hover:bg-gray-200 rounded" title="Align Left"><AlignLeft size={16} /></button>
        <button type="button" onClick={() => executeCommand('justifyCenter')} className="p-2 hover:bg-gray-200 rounded" title="Align Center"><AlignCenter size={16} /></button>
        <button type="button" onClick={() => executeCommand('justifyRight')} className="p-2 hover:bg-gray-200 rounded" title="Align Right"><AlignRight size={16} /></button>
        <div className="border-l border-gray-300 mx-1 h-6"></div>
        <button type="button" onClick={() => executeCommand('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded" title="Bullet List"><List size={16} /></button>
        <button type="button" onClick={() => executeCommand('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded" title="Numbered List"><ListOrdered size={16} /></button>
        <div className="border-l border-gray-300 mx-1 h-6"></div>
        {/* --- MODAL: Link button opens a modal --- */}
        <button type="button" onClick={() => setIsLinkModalOpen(true)} className="p-2 hover:bg-gray-200 rounded" title="Insert Link"><Link size={16} /></button>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: initialContent }}
        onInput={handleContentChange}
        className="min-h-[350px] p-4 focus:outline-none"
      />
      
      {/* --- MODAL: Link Insertion Modal --- */}
      <LinkModal isOpen={isLinkModalOpen} onOpenChange={setIsLinkModalOpen} onInsert={handleInsertLink} />
    </div>
  );
};

// --- MODAL: A dedicated modal for inserting links ---
const LinkModal = ({ isOpen, onOpenChange, onInsert }) => {
    const [url, setUrl] = useState('https://');
    
    const handleInsert = () => {
        onInsert(url);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader><DialogTitle>Insert Link</DialogTitle><DialogDescription>Enter the full URL you want to link to.</DialogDescription></DialogHeader>
                <div className="py-4">
                    <Label htmlFor="link-url">URL</Label>
                    <Input id="link-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleInsert}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const HowToPlay = () => {
    const [editorContent, setEditorContent] = useState('<p>we are testing <strong>HOW</strong> <em>to play this game.</em></p>');
    const [videoLink, setVideoLink] = useState('https://www.youtube.com/');
    
    // --- MODAL: State for submission modal and loading status ---
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- MODAL: This now opens the confirmation modal ---
    const handleOpenConfirmation = (e) => {
        e.preventDefault();
        setIsConfirmModalOpen(true);
    };

    // --- MODAL: This handles the final submission from the modal ---
    const handleSubmit = () => {
        const promise = () => new Promise(async (resolve, reject) => {
            setIsSubmitting(true);
            const formData = { howToPlayContentHtml: editorContent, videoLink: videoLink };
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
                console.log('API Response for How To Play:', formData);
                resolve(formData);
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            loading: 'Updating "How To Play" content...',
            success: (data) => {
                setIsSubmitting(false);
                setIsConfirmModalOpen(false);
                return 'Content updated successfully!';
            },
            error: (err) => {
                setIsSubmitting(false);
                return 'Failed to update content. Please try again.';
            },
        });
    };

    return (
        <>
            <Toaster position="top-right" richColors />
            {/* RESPONSIVE: Padding adjusts for screen size */}
            <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <Card className="w-full max-w-4xl shadow-lg">
                    <CardHeader><CardTitle className="text-xl font-bold">How To Play</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleOpenConfirmation} className="space-y-6">
                            <div>
                                <Label className="font-semibold text-gray-800">How To Play Content</Label>
                                <div className="mt-2"><RichTextEditor initialContent={editorContent} onChange={setEditorContent} /></div>
                            </div>
                            <div>
                                <Label htmlFor="video-link" className="font-semibold text-gray-800">Video Link</Label>
                                <Input id="video-link" type="url" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} className="mt-2" placeholder="https://www.youtube.com/" />
                            </div>
                            <div>
                                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-6 w-full sm:w-auto">Submit</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            
            {/* --- MODAL: Confirmation Dialog --- */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader><DialogTitle>Confirm Content</DialogTitle><DialogDescription>Please review the content and video link before saving.</DialogDescription></DialogHeader>
                    <div className="my-4 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Content Preview:</h4>
                            <div className="p-4 border rounded-md min-h-[100px] max-h-60 overflow-y-auto bg-white" dangerouslySetInnerHTML={{ __html: editorContent }} />
                        </div>
                        <div>
                            <h4 className="font-semibold">Video Link:</h4>
                            <p className="text-sm text-blue-600 break-all">{videoLink}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Saving...' : 'Confirm & Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HowToPlay;