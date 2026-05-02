export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  headline: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  achievements: string[];
  customSections: CustomSection[];
}

export const initialResumeData: ResumeData = {
  headline: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    website: "johndoe.dev",
  },
  summary: "Results-driven software engineer with over 5 years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture.",
  experiences: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Developer",
      startDate: "2021",
      endDate: "Present",
      description: "Led a team of 10 developers to rebuild the core banking platform, increasing performance by 40%.",
    },
  ],
  educations: [
    {
      id: "1",
      school: "Stanford University",
      degree: "B.S. in Computer Science",
      year: "2018",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker"],
  achievements: [
    "Published 3 open-source libraries with 5k+ stars",
    "Keynote speaker at React Conf 2023",
  ],
  customSections: [],
};
