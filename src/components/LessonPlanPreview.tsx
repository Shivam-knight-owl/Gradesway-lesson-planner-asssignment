import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LessonPlanPreviewProps {
  generatedContent: string | null;
}

export function LessonPlanPreview({ generatedContent }: LessonPlanPreviewProps) {
    return (
      <Card className="bg-white p-6 rounded-lg shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Generated Lesson Plan</CardTitle>
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
  