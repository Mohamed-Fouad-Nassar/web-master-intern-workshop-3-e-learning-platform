import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "@/validations/QuestionSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useUpdateQuestion } from "@/hooks/admin/questions/UseUpdateQuestion";

export default function UpdateQuestionForm({ question, exams = [], onSuccess }) {
  const { register, handleSubmit, setValue, watch, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: question.text || "",
      type: question.type || "",
      options: question.options || ["", "", "", ""],
      correctAnswer: question.correctAnswer || "",
      exam: typeof question.exam === "string" ? question.exam : question.exam?._id || "",
      points: question.points || "",
    },
  });

  const watchType = watch("type");
  const { mutate: updateQuestion, isPending } = useUpdateQuestion();

  useEffect(() => {
    if (watchType === "true-false") {
      setValue("options", ["True", "False"]);
      if (!["True", "False"].includes(watch("correctAnswer"))) {
        setValue("correctAnswer", "");
      }
    } else if (watchType === "short-answer") {
      setValue("options", []);
      setValue("correctAnswer", "");
    } else if (watchType === "multiple-choice") {
      setValue("options", question.options?.length ? question.options : ["", "", "", ""]);
    }
  }, [watchType, setValue, question.options]);

  const handleOptionChange = (index, value) => {
    const current = watch("options") || [];
    const updated = [...current];
    updated[index] = value;
    setValue("options", updated);
  };

 const onSubmitForm = (data) => {
  // Force correct options for true-false
  if (data.type === "true-false") {
    delete data.options;

    // Validate correctAnswer
    if (data.correctAnswer !== "True" && data.correctAnswer !== "False") {
      alert("Correct answer must be either 'True' or 'False'");
      return; // Prevent submission
    }
  } else if (data.type === "short-answer") {
    delete data.options;
  }

  console.log("🚀 Submitting Data:", data);

  updateQuestion({
    questionId: question._id,
    data,
  }, {
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });
};


  const onSubmitError = (errors) => {
    console.log("❌ Validation Errors:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)} className="space-y-6 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-md border border-border dark:border-gray-700 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Question</h2>

      <div className="space-y-2">
        <Label>Question Text</Label>
        <Textarea {...register("text")} placeholder="Enter the question" />
        {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label>Type</Label>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True / False</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      {watchType === "multiple-choice" && (
        <div className="space-y-2">
          <Label>Options</Label>
          {[0, 1, 2, 3].map((idx) => (
            <Input
              key={idx}
              placeholder={`Option ${idx + 1}`}
              value={watch("options")[idx] || ""}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          ))}
          {errors.options && <p className="text-red-500 text-sm">{errors.options.message}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label>Correct Answer</Label>
        {watchType === "true-false" ? (
          <Controller
            control={control}
            name="correctAnswer"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="True">True</SelectItem>
                  <SelectItem value="False">False</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <Textarea {...register("correctAnswer")} placeholder="Write the correct answer" />
        )}
        {errors.correctAnswer && <p className="text-red-500 text-sm">{errors.correctAnswer.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Points</Label>
        <Input type="number" {...register("points")} placeholder="e.g. 2" />
        {errors.points && <p className="text-red-500 text-sm">{errors.points.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update Question"}
      </Button>
    </form>
  );
}
