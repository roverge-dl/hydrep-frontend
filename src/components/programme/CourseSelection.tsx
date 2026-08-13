/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/application/CourseSelection.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { StepChildProps } from "../../types/programFormData";
import { getProgramDetail } from "../../services/api/applicationService";
import { BiLoaderAlt } from "react-icons/bi";

const CourseSelection: React.FC<StepChildProps> = ({
  formData,
  setFormData, // Make sure to destructure this to handle array updates
  fieldErrors,
  setProgramCourses
}) => {
  const { slug } = useParams<{ slug: string }>(); 
  const [courses, setCourses] = useState<{ label: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCourses = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProgramDetail(slug);
        console.log("program response", response);
        if (mounted && response.status === "success") {
          const formattedCourses = response.data.courses.map((c: any) => ({
            label: c.name,
            value: c.id.toString(),
            description: c.description
          }));
          setCourses(formattedCourses);
          
          setProgramCourses?.(formattedCourses);
        }
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        if (mounted) setError(err.message || "Could not load courses.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchCourses();
    return () => { mounted = false; };
  }, [slug]);

  // Handler for toggling courses in the array
  const handleToggleCourse = (courseValue: string) => {
    const currentSelections = formData.selectedCourses || [];
    
    if (currentSelections.includes(courseValue)) {
      // Remove course if already selected
      setFormData?.((prev: any) => ({
        ...prev,
        selectedCourses: currentSelections.filter((val: string) => val !== courseValue)
      }));
      
    } else {
      // Add course if not selected
      setFormData?.((prev: any) => ({
        ...prev,
        selectedCourses: [...currentSelections, courseValue]
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm py-4">
        <BiLoaderAlt className="animate-spin" /> Loading available courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm py-4">
        {error}. Please refresh the page to try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
       <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-hdark-500">Course Selection</h3>
        <p className="text-sm text-gray-400">
          Please select the courses you wish to apply for under this programme.
        </p>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-xl">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Available Courses
        </label>
        
        <div className="space-y-3">
          {courses.map((course) => (
            <label 
              key={course.value} 
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-hgreen-500 rounded border-gray-300 focus:ring-hgreen-500"
                checked={(formData.selectedCourses || []).includes(course.value)}
                onChange={() => handleToggleCourse(course.value)}
              />
              <span className="text-gray-700">{course.label}</span>
            </label>
          ))}
        </div>

        {fieldErrors?.selectedCourses && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.selectedCourses}</p>
        )}
        
        {(formData.selectedCourses && formData.selectedCourses.length > 0) && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
             <p className="text-sm text-green-800">
               <strong>Note:</strong> The required documents in the next steps may change based on the courses you selected.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSelection;