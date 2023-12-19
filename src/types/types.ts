import { Categories } from "../utils";

export interface TaskProps {
  id: string;
  title: string;
  date: string | null;
  startTask: Date | null;
  endtTask: Date | null;
  allDay: boolean;
  withAlert: boolean;
  isCompleted: boolean;
  category: Categories | null;
}
