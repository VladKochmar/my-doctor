import { DayType } from './day.type';

export interface ScheduleFormInterface {
  day_of_week: DayType;
  start_time: string;
  end_time: string;
}
