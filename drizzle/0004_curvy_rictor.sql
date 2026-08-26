CREATE INDEX `class_members_class_id_idx` ON `classMembers` (`classId`);--> statement-breakpoint
CREATE INDEX `class_members_student_id_idx` ON `classMembers` (`studentId`);--> statement-breakpoint
CREATE INDEX `classes_teacher_id_idx` ON `classes` (`teacherId`);--> statement-breakpoint
CREATE INDEX `student_progress_student_id_idx` ON `studentProgress` (`studentId`);