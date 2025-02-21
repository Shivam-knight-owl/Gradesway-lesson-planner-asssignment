import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import jsPDF from 'jspdf';

interface LessonPlanPreviewProps {
  generatedContent: string | null;
}

export function LessonPlanPreview({ generatedContent }: LessonPlanPreviewProps) {

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        if (generatedContent) {
          const lines = pdf.splitTextToSize(generatedContent, 180);
          pdf.text(lines, 10, 10); 
        }
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
  