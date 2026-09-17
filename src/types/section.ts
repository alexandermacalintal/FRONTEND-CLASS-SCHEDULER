import type { Schedule } from "./schedule";

export type SectionId = string;

export interface Section {
  id: SectionId;
  section: string;
  instructor: string;
  room: string;
  schedule: Schedule[];
}
