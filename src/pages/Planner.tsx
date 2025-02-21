import { FormData, LessonPlanForm } from "@/components/LessonPlanForm"
import { LessonPlanPreview } from "@/components/LessonPlanPreview"
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const Planner=()=>{
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);

    const generateAILessonPlan = async (formData:FormData) => {
        setLoading(true);
        const prompt = `Generate a detailed lesson plan based on the following details:\n
        Topic: ${formData.topic}\n
        Grade Level: ${formData.gradeLevel}\n
        Main Concept: ${formData.mainConcept}\n
        Subtopics: ${formData.subtopics}\n
        Materials Needed: ${formData.materials}\n
        Learning Objectives: ${formData.objectives}\n
        Lesson Outline: ${formData.outline}\n
        Include suggested activities and assessment questions.`;

        try {
        const response = await fetch('/api/generateLessonPlan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        setGeneratedContent(data.generatedContent);
        } catch (error) {
        console.error('Error generating content:', error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="shadow-lg p-10 bg-white rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <LessonPlanForm onSubmitFormData={(v:any)=>console.log(v)} /> */}
                <LessonPlanForm onSubmitFormData={(formData)=>generateAILessonPlan(formData)} />
                {loading ? (
                    <Skeleton className="h-96 w-full" />
                ) : (
                    <LessonPlanPreview generatedContent={generatedContent}/>
                )}
            </div>
        </div>
    );
}