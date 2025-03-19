export interface ISkill {
    _id: string
    name: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    category: "Programming Languages" | "Frontend Frameworks" | "Backend Technologies" | "Databases" | "CSS Frameworks" | "Tools";
    experience: string;
    icon: string;
  }