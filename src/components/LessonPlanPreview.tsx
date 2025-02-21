import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea'; // Import Textarea for editing
import jsPDF from 'jspdf';

interface LessonPlanPreviewProps {
  generatedContent: string | null;
}

export function LessonPlanPreview({ generatedContent }: LessonPlanPreviewProps) {
  const [editedContent, setEditedContent] = useState(generatedContent || ''); // State for edited content

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    const margin = 10; 
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 10;
    let y = margin;

    if (editedContent) {
      const lines = pdf.splitTextToSize(editedContent, maxWidth);

      // Add each line to the PDF
      for (let i = 0; i < lines.length; i++) {
        // Check if the current line will fit on the page
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage(); // Add a new page
          y = margin; // Reset the vertical position
        }

        // Add the line to the PDF
        pdf.text(lines[i], margin, y);
        y += lineHeight; // Move to the next line
      }
    }

    pdf.save("lesson_plan.pdf");
  };

  return (
    <Card className="rounded-lg shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Generated Lesson Plan</CardTitle>
        {editedContent && (
          <div className="flex justify-end">
            <Button onClick={handleDownloadPDF} className="cursor-pointer">
              Download PDF
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {editedContent ? (
          // Editable Textarea 
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)} 
            className="w-full h-200" // Set a fixed height for the textarea
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No content generated yet.</p>
        )}
      </CardContent>
    </Card>
  );
}