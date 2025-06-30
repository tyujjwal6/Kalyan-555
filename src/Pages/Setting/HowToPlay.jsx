import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

// --- DUMMY API HANDLER ---
// This function simulates an API call to save the form data.
const handleApiCall = async (action, data) => {
  console.log(`[API Call Start] Action: ${action}`, data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`[API Call Success] Action "${action}" completed.`);
  alert(`Form submitted successfully!\n\nCheck the browser console for the data payload.`);
};

const RichTextEditor = ({ initialContent, onChange }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <div className="border-l border-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <div className="border-l border-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <div className="border-l border-gray-300 mx-1"></div>
        <select
          onChange={(e) => executeCommand('formatBlock', e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          defaultValue=""
        >
          <option value="">Format</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        className="min-h-[350px] p-4 focus:outline-none"
        style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

const HowToPlay = () => {
    // State for the rich text editor content
    const [editorContent, setEditorContent] = useState('<p>we are testing <strong>HOW</strong> <em>to play this game.</em></p>');
    
    // State for the video link input field
    const [videoLink, setVideoLink] = useState('https://www.youtube.com/');

    // Handles the form submission
    const handleSubmit = () => {
        // Format the data for the backend API
        const formData = {
            howToPlayContentHtml: editorContent,
            videoLink: videoLink,
        };
        
        // Hit the dummy API with the form data
        handleApiCall('Update How To Play Content', formData);
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">How To Play</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="how-to-play-content" className="font-semibold text-gray-800">
                                How To Play Content
                            </Label>
                            <div className="mt-2">
                                <RichTextEditor
                                    initialContent={editorContent}
                                    onChange={setEditorContent}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="video-link" className="font-semibold text-gray-800">
                                Video Link
                            </Label>
                            <Input
                                id="video-link"
                                type="url"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                className="mt-2"
                                placeholder="https://www.youtube.com/"
                            />
                        </div>

                        <div>
                            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-6">
                                Submit
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HowToPlay;