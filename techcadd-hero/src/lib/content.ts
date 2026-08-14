import { Users, Code2, BriefcaseBusiness } from "lucide-react";
import type { RobotEffect } from "./robotBus";

export const NAV_LINKS = [
  { label: "Home", href: "#home", dropdown: false, active: false },
  { label: "About Us", href: "#about", dropdown: true, active: false },
  { label: "AI", href: "#ai", dropdown: false, active: true },
  { label: "Courses", href: "#courses", dropdown: true, active: false },
  { label: "Internship & Training", href: "#internship", dropdown: true, active: false },
  { label: "After 12th", href: "#after-12th", dropdown: true, active: false },
  { label: "Resources", href: "#resources", dropdown: true, active: false },
  { label: "Contact Us", href: "#contact", dropdown: false, active: false },
] as const;

export const BADGE = "TECHCADD HOSHIARPUR • AI & SOFTWARE TRAINING";

/** Line breaks match the reference exactly. */
export const HEADING = {
  line1: "Build The Skills",
  line2: "That Turn You Into A",
  gradient: "Job-Ready Engineer",
  line4: "In AI & Software",
};

export const DESCRIPTION =
  "Industry-focused training, real-world projects, and expert mentorship to help you launch your dream tech career.";

export const FEATURES = [
  { icon: Users, line1: "Industry Expert", line2: "Mentors" },
  { icon: Code2, line1: "Hands-on", line2: "Projects" },
  { icon: BriefcaseBusiness, line1: "100% Placement", line2: "Assistance" },
] as const;

export type CourseTag = {
  id: string;
  label: string;
  icon: "python" | "react" | "code" | "chart" | "brain" | "cloud" | "layers" | "globe";
  /** percentage position inside the stage box */
  left: string;
  top: string;
  delay: number;
  effect: RobotEffect;
  color: [number, number, number];
};

/**
 * Eight course tags ringed around the robot. Positions keep the middle of the
 * stage clear so nothing sits on top of the model.
 */
export const COURSE_TAGS: CourseTag[] = [
  { id: "aiml", label: "AI / ML", icon: "brain", left: "62%", top: "1%", delay: 0, effect: "holo", color: [0.55, 0.45, 1] },
  { id: "python", label: "Python", icon: "python", left: "6%", top: "8%", delay: 0.7, effect: "pulse", color: [1, 0.83, 0.23] },
  { id: "mern", label: "MERN Stack", icon: "layers", left: "78%", top: "17%", delay: 1.4, effect: "pulse", color: [0.24, 0.85, 0.68] },
  { id: "analytics", label: "Data Analytics", icon: "chart", left: "-1%", top: "27%", delay: 2.1, effect: "chart", color: [0.31, 0.72, 1] },
  { id: "datascience", label: "Data Science", icon: "globe", left: "80%", top: "44%", delay: 2.8, effect: "chart", color: [0.45, 0.62, 1] },
  { id: "cloud", label: "Cloud Computing", icon: "cloud", left: "-3%", top: "50%", delay: 3.5, effect: "holo", color: [0.4, 0.85, 1] },
  { id: "fullstack", label: "Full Stack Development", icon: "code", left: "56%", top: "88%", delay: 4.2, effect: "pulse", color: [0.7, 0.45, 1] },
  { id: "webdev", label: "Web Development", icon: "react", left: "2%", top: "80%", delay: 4.9, effect: "pulse", color: [0.38, 0.85, 0.98] },
];
