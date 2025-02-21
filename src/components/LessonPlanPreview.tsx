import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import jsPDF from 'jspdf';

interface LessonPlanPreviewProps {
  generatedContent: string | null;
}

export function LessonPlanPreview({ generatedContent }: LessonPlanPreviewProps) {

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
      
        const margin = 10; // Margin on all sides
        const pageWidth = pdf.internal.pageSize.getWidth(); 
        const pageHeight = pdf.internal.pageSize.getHeight(); 
        const maxWidth = pageWidth - 2 * margin; 
        const lineHeight = 10; 
        let y = margin; 
      
        if (generatedContent) {
          
          const lines = pdf.splitTextToSize(generatedContent, maxWidth);
      
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
      
        // Save the PDF
        pdf.save("lesson_plan.pdf");
      };

    return (
      <Card className=" p-6 rounded-lg shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Generated Lesson Plan</CardTitle>
          {generatedContent && (
          <div className='flex justify-end '>
            <Button onClick={handleDownloadPDF} className='cursor-pointer'>
                Download PDF
            </Button>
          </div>
        )}
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="space-y-4 whitespace-pre-wrap break-words">{generatedContent}</div>
          ) : (
            <p className="text-gray-500">No content generated yet.</p>
          )}
        </CardContent>
      </Card>
    );
  }
  