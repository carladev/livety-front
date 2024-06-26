export interface Habit {
  habitId: number;
  habitName: string;
  color: string;
  icon: string;
  frequencyId: string;
  frequencyName: string;
  weekDays: WeekDay[];
  habitGoal: number;
  habitGoalUnit: string;
  record: number;
}

export interface Frenquency {
  frequencyId: number;
  frequencyName: string;
}

export interface WeekDay {
  weekdayId: number;
  weekdayAlias: string;
  weekdayName?: string;
  selected?: boolean;
}
