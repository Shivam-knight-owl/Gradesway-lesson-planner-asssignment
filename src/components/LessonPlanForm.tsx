
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export interface FormData {
  topic: string;
  gradeLevel: string;
  mainConcept: string;
  subtopics: string;
  materials: string;
  objectives: string;
  outline: string;
}
// LessonPlanForm now passes formData to parent on submit
export function LessonPlanForm({ onSubmitFormData }: { onSubmitFormData: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    gradeLevel: '',
    mainConcept: '',
    subtopics: '',
    materials: '',
    objectives: '',
    outline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitFormData(formData);
  };

  return (
    <Card className="bg-white p-2 rounded-lg shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Lesson Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input name="topic" placeholder="Topic (e.g. Introduction to Fractions)" value={formData.topic} onChange={handleChange} />

          <Input name="gradeLevel" placeholder="Grade Level (e.g. 6th Grade)" value={formData.gradeLevel} onChange={handleChange} />

          <Input name="mainConcept" placeholder="Main Concept" value={formData.mainConcept} onChange={handleChange} />

          <Textarea name="subtopics" placeholder="Subtopics (comma-separated)" value={formData.subtopics} onChange={handleChange} rows={3} />

          <Textarea name="materials" placeholder="Materials Needed..." value={formData.materials} onChange={handleChange} rows={3} />

          <Textarea name="objectives" placeholder="Learning Objectives..." value={formData.objectives} onChange={handleChange} rows={3} />

          <Accordion type="single" collapsible>
            <AccordionItem value="outline">
              <AccordionTrigger>Lesson Outline</AccordionTrigger>
              <AccordionContent>
                <Textarea name="outline" placeholder="Lesson Outline..." value={formData.outline} onChange={handleChange} rows={5} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-center space-x-4">
            <Button type="button" variant="ghost" className='cursor-pointer' onClick={() => setFormData({
              topic: '', gradeLevel: '', mainConcept: '', subtopics: '', materials: '', objectives: '', outline: ''
            })}>
              Clear
            </Button>
            <Button type="submit" variant="default" className='cursor-pointer'>
              Generate Plan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}