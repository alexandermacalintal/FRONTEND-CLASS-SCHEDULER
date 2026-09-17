import type { Course } from "../types";

export const courses: Course[] = [
  {
    id: "CCPROG3",
    code: "CCPROG3",
    title: "Object-Oriented Programming",
    units: 3,
    sections: [
      {
        id: "CCPROG3-Y01",
        section: "Y01",
        instructor: "Juan Dela Cruz",
        room: "G301",
        schedule: [
          { day: "Monday", startTime: "07:30", endTime: "09:00" },
          { day: "Wednesday", startTime: "07:30", endTime: "09:00" },
        ],
      },
      {
        id: "CCPROG3-Y02",
        section: "Y02",
        instructor: "Maria Santos",
        room: "G305",
        schedule: [
          { day: "Tuesday", startTime: "07:30", endTime: "09:00" },
          { day: "Thursday", startTime: "07:30", endTime: "09:00" },
        ],
      },
      {
        id: "CCPROG3-Y03",
        section: "Y03",
        instructor: "Juan Dela Cruz",
        room: "G302",
        schedule: [
          { day: "Friday", startTime: "07:30", endTime: "09:00" },
        ],
      },
    ],
  },
  {
    id: "CSMODEL",
    code: "CSMODEL",
    title: "Mathematical Modeling",
    units: 3,
    sections: [
      {
        id: "CSMODEL-Y01",
        section: "Y01",
        instructor: "Pedro Reyes",
        room: "G201",
        schedule: [
          { day: "Monday", startTime: "09:15", endTime: "10:45" },
          { day: "Wednesday", startTime: "09:15", endTime: "10:45" },
        ],
      },
      {
        id: "CSMODEL-Y02",
        section: "Y02",
        instructor: "Angela Lim",
        room: "G204",
        schedule: [
          { day: "Tuesday", startTime: "09:15", endTime: "10:45" },
          { day: "Thursday", startTime: "09:15", endTime: "10:45" },
        ],
      },
    ],
  },
  {
    id: "CCDSTRU",
    code: "CCDSTRU",
    title: "Data Structures and Algorithms",
    units: 3,
    sections: [
      {
        id: "CCDSTRU-N01",
        section: "N01",
        instructor: "Ramon Villanueva",
        room: "G401",
        schedule: [
          { day: "Monday", startTime: "11:00", endTime: "12:30" },
          { day: "Wednesday", startTime: "11:00", endTime: "12:30" },
        ],
      },
      {
        id: "CCDSTRU-N02",
        section: "N02",
        instructor: "Katrina Bautista",
        room: "G402",
        schedule: [
          { day: "Tuesday", startTime: "11:00", endTime: "12:30" },
          { day: "Thursday", startTime: "11:00", endTime: "12:30" },
        ],
      },
      {
        id: "CCDSTRU-N03",
        section: "N03",
        instructor: "Ramon Villanueva",
        room: "G403",
        schedule: [
          { day: "Friday", startTime: "11:00", endTime: "12:30" },
        ],
      },
    ],
  },
  {
    id: "STINTPR",
    code: "STINTPR",
    title: "Probability and Statistics",
    units: 3,
    sections: [
      {
        id: "STINTPR-A11",
        section: "A11",
        instructor: "Cristina Aquino",
        room: "G101",
        schedule: [
          { day: "Monday", startTime: "12:45", endTime: "14:15" },
          { day: "Wednesday", startTime: "12:45", endTime: "14:15" },
        ],
      },
      {
        id: "STINTPR-A12",
        section: "A12",
        instructor: "Noel Mercado",
        room: "G102",
        schedule: [
          { day: "Tuesday", startTime: "12:45", endTime: "14:15" },
          { day: "Thursday", startTime: "12:45", endTime: "14:15" },
        ],
      },
    ],
  },
  {
    id: "CCAPDEV",
    code: "CCAPDEV",
    title: "Application Development and Emerging Technologies",
    units: 3,
    sections: [
      {
        id: "CCAPDEV-S11",
        section: "S11",
        instructor: "Bianca Torres",
        room: "G501",
        schedule: [
          { day: "Monday", startTime: "14:30", endTime: "16:00" },
          { day: "Wednesday", startTime: "14:30", endTime: "16:00" },
        ],
      },
      {
        id: "CCAPDEV-S12",
        section: "S12",
        instructor: "Miguel Ocampo",
        room: "G502",
        schedule: [
          { day: "Tuesday", startTime: "14:30", endTime: "16:00" },
          { day: "Thursday", startTime: "14:30", endTime: "16:00" },
        ],
      },
      {
        id: "CCAPDEV-S13",
        section: "S13",
        instructor: "Bianca Torres",
        room: "G503",
        schedule: [
          { day: "Friday", startTime: "14:30", endTime: "16:00" },
        ],
      },
    ],
  },
  {
    id: "CSARCH1",
    code: "CSARCH1",
    title: "Computer Organization and Architecture",
    units: 3,
    sections: [
      {
        id: "CSARCH1-A21",
        section: "A21",
        instructor: "Rafael Gomez",
        room: "G601",
        schedule: [
          { day: "Monday", startTime: "16:15", endTime: "17:45" },
          { day: "Wednesday", startTime: "16:15", endTime: "17:45" },
        ],
      },
      {
        id: "CSARCH1-A22",
        section: "A22",
        instructor: "Loreto Fernandez",
        room: "G602",
        schedule: [
          { day: "Tuesday", startTime: "16:15", endTime: "17:45" },
          { day: "Thursday", startTime: "16:15", endTime: "17:45" },
        ],
      },
    ],
  },
];