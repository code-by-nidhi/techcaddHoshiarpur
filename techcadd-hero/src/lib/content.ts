import { Users, Code2, BriefcaseBusiness } from "lucide-react";
import type { RobotEffect } from "./robotBus";

/**
 * Section links are written as "/#id" rather than "#id" so they still resolve
 * from routes other than the home page, such as /contact.
 *
 * "About Us" is both a route (/about) and a dropdown over its three detail
 * pages. The old note below is kept for the other plain links: the
 * chevron would promise a panel that does not exist.
 */
export const NAV_LINKS = [
  { label: "Home", href: "/", dropdown: false },
  { label: "About Us", href: "/about", dropdown: true },
  { label: "AI", href: "/courses", dropdown: true },
  { label: "Courses", href: "/courses", dropdown: true },
  { label: "Internship & Training", href: "/#included", dropdown: true },
  { label: "After 12th", href: "/courses", dropdown: true },
  { label: "Resources", href: "/blog", dropdown: false },
  { label: "Contact Us", href: "/contact", dropdown: false },
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
  /**
   * Where the tag sits on the ring, in degrees clockwise from twelve o'clock.
   *
   * An angle rather than a left/top pair, because the ring has to be a
   * different size at every breakpoint and hand-tuned percentages cannot
   * follow it. FloatingTechCards turns this into a position on an ellipse
   * whose radii are CSS variables, so one set of angles serves every width.
   *
   * Eight tags, 45 degrees apart: the spacing is even by construction.
   */
  angle: number;
  delay: number;
  effect: RobotEffect;
  color: [number, number, number];
};

/**
 * Eight course tags ringed around the robot. Each declares only its angle; the
 * radius, and therefore the clearance from the robot, is set per breakpoint in
 * FloatingTechCards.
 */
export const COURSE_TAGS: CourseTag[] = [
  /*
   * The ring, assigned by label width rather than by subject.
   *
   * The stage is at its narrowest just above the two-column breakpoint — 477px
   * at a 1024px viewport — while the labels run from 113px to 230px. A tag at
   * three or nine o'clock is the one competing with the robot for horizontal
   * room, so the two shortest labels go there and the two longest go to twelve
   * and six, where the full width of the stage is free. That single choice is
   * what lets the robot stay as large as it does while nothing overlaps.
   *
   *   0 deg  top          Full Stack Development  230px  (widest)
   *   45     top-right    MERN Stack              155
   *   90     right        AI / ML                 121  (narrow: side)
   *   135    bottom-right Data Science            161
   *   180    bottom       Cloud Computing         190
   *   225    bottom-left  Web Development         187
   *   270    left         Python                  113  (narrowest: side)
   *   315    top-left     Data Analytics          171
   */
  { id: "aiml", label: "AI / ML", icon: "brain", angle: 90, delay: 0, effect: "holo", color: [0.55, 0.45, 1] },
  { id: "python", label: "Python", icon: "python", angle: 270, delay: 0.7, effect: "pulse", color: [1, 0.83, 0.23] },
  { id: "mern", label: "MERN Stack", icon: "layers", angle: 45, delay: 1.4, effect: "pulse", color: [0.24, 0.85, 0.68] },
  { id: "analytics", label: "Data Analytics", icon: "chart", angle: 315, delay: 2.1, effect: "chart", color: [0.31, 0.72, 1] },
  { id: "datascience", label: "Data Science", icon: "globe", angle: 135, delay: 2.8, effect: "chart", color: [0.45, 0.62, 1] },
  { id: "cloud", label: "Cloud Computing", icon: "cloud", angle: 180, delay: 3.5, effect: "holo", color: [0.4, 0.85, 1] },
  { id: "fullstack", label: "Full Stack Development", icon: "code", angle: 0, delay: 4.2, effect: "pulse", color: [0.7, 0.45, 1] },
  { id: "webdev", label: "Web Development", icon: "react", angle: 225, delay: 4.9, effect: "pulse", color: [0.38, 0.85, 0.98] },
];
