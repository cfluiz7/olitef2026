CREATE TABLE `studentReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`level` enum('nivel-1','nivel-2') NOT NULL,
	`topic` varchar(120) NOT NULL,
	`intervalDays` int NOT NULL DEFAULT 1,
	`dueAt` timestamp NOT NULL DEFAULT (now()),
	`lastResult` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studentReviews_id` PRIMARY KEY(`id`)
);
