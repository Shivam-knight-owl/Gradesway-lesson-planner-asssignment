import { FormData, LessonPlanForm } from "@/components/LessonPlanForm"
import { LessonPlanPreview } from "@/components/LessonPlanPreview"
import { Skeleton } from "@/components/ui/skeleton";
import { chatSession } from "@/utils/AIModel";
import { useState } from "react";

export const Planner=()=>{
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);

    const generateAILessonPlan = async (formData:FormData) => {
        setLoading(true);

        const prompt = `Generate a detailed and well-structured lesson plan for the topic: ${formData.topic} (Grade: ${formData.gradeLevel}).\n
        \nThe output should follow these formatting rules:
        \n- Use clear headings without markdown symbols (#, *, **, etc.).
        \n- Headings should be capitalized and underlined with dashes.
        \n- Use hyphens (-) for bullet points without extra symbols.
        \n- Ensure the sections include:
        \n  Subject: ${formData.topic}
        \n  Grade Level: ${formData.gradeLevel}
        \n  Main Concept: ${formData.mainConcept}
        \n  Subtopics: ${formData.subtopics}
        \n  Materials Needed: ${formData.materials}
        \n  Learning Objectives: ${formData.objectives}
        \n  Lesson Outline: ${formData.outline}\n- Include:
        \n  1. Detailed Lesson Content
        \n  2. Suggested Classroom Activities
        \n  3. Assessment Questions
        \n- The response should be in clean plain text with no markdown characters.`;

        try {
            const result=await chatSession.sendMessage(prompt);
            const airesponse=result.response.text();
            console.log(airesponse);
            setGeneratedContent(airesponse);
        } 
        catch (error) {
            console.error('Failed to generate lesson plan', error);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="shadow-lg p-6 bg-white rounded-lg">
            <div className="grid grid-cols-1 gap-8">
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