export interface Habit {
  userHabitId?: number;
  userId: number;
  frequencyId: string;
  title: string;
  color:string;
  icon?: string;
  }

export interface DailyDate {
  date: Date;
  weekday: string;
  longWeekday: string;
  day: number;
  month: string;
  year:string;
  selectedDay: boolean;
  }