export type ResourceType =
  | "bonus-chapter"
  | "discussion-guide"
  | "template"
  | "reference"
  | "photo"
  | "video";

export interface ResourceFrontmatter {
  title: string;
  slug: string;
  chapter: number | null;
  chapterTitle: string | null;
  part: "1" | "2" | "3" | "bonus";
  type: ResourceType;
  description: string;
  downloadFile: string | null;
  videoUrl: string | null;
  driveUrl: string | null;
  externalUrl: string | null;
  order: number;
  featured?: boolean;
  photos?: string[];
}

export interface Resource extends ResourceFrontmatter {
  content: string;
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  "bonus-chapter": "Bonus Chapters",
  "discussion-guide": "Discussion & Activities",
  template: "Templates & Lesson Plans",
  reference: "Reference Sheets",
  photo: "Photos & Classroom Examples",
  video: "Videos",
};

export const BOOK_PARTS = [
  {
    part: "1" as const,
    title: "Background",
    chapters: [
      { num: 1, title: "What is Universal Design for Learning?" },
      { num: 2, title: "Designing the Environment" },
      { num: 3, title: "Community and Connections" },
    ],
  },
  {
    part: "2" as const,
    title: "Embedded Practices",
    chapters: [
      { num: 4, title: "Transitions" },
      { num: 5, title: "Reflection" },
      { num: 6, title: "Small Group Instruction" },
      { num: 7, title: "Emotional Literacy" },
      { num: 8, title: "Centers" },
    ],
  },
  {
    part: "3" as const,
    title: "From the Day",
    chapters: [
      { num: 9, title: "Arrival and Morning Routines" },
      { num: 10, title: "Morning Meeting" },
      { num: 11, title: "Calendar" },
      { num: 12, title: "Reading, Phonics and Literacy" },
      { num: 13, title: "Writing" },
      { num: 14, title: "Recess" },
      { num: 15, title: "Math" },
      { num: 16, title: "Read Alouds and Reading Comprehension" },
      { num: 17, title: "Closing Circle and Dismissal" },
    ],
  },
];
