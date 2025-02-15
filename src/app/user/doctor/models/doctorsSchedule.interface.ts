import { DayType } from './day.type';

export interface DoctorsScheduleInterface {
  schedule_id: number;
  doctor_id: number;
  day_of_week: DayType;
  start_time: string;
  end_time: string;
}
