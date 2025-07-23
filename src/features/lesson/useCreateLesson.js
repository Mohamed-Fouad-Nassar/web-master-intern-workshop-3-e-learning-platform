import { useMutation } from "@tanstack/react-query";

import { createLesson } from "@/services/lessonAPI";

export default function useCreateLesson() {
  return useMutation({
    mutationFn: createLesson,
  });
}
