import { DayType } from '../common/types/date';

export class CareWorkerSchedule {
  public static noArgsConstructor() {
    return new CareWorkerSchedule(0, 0, 0, 0);
  }

  public static allArgsConstructor(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    return new CareWorkerSchedule(startHour, startMinute, endHour, endMinute);
  }

  public days: string[];
  public startHour: number;
  public startMinute: number;
  public endHour: number;
  public endMinute: number;

  public constructor(startHour: any, startMinute: any, endHour: any, endMinute: any) {
    this.days = [];
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
  }
}

export const toggleDayOfCareWorkerSchedule = (
  careWorkerSchedule: CareWorkerSchedule,
  day: DayType
) => {
  if (careWorkerSchedule.days.includes(day))
    careWorkerSchedule.days = careWorkerSchedule.days.filter((includedDay) => includedDay !== day);
  else careWorkerSchedule.days.push(day);

  return careWorkerSchedule;
};

export const isCareWorkerScheduleValid = (careWorkerSchedule: CareWorkerSchedule) => {
  if (
    careWorkerSchedule.startHour === null &&
    careWorkerSchedule.startMinute === null &&
    careWorkerSchedule.endHour === null &&
    careWorkerSchedule.endMinute === null
  )
    return true;

  if (
    careWorkerSchedule.startHour === null ||
    careWorkerSchedule.startMinute === null ||
    careWorkerSchedule.endHour === null ||
    careWorkerSchedule.endMinute === null
  )
    return false;

  if (careWorkerSchedule.startHour > careWorkerSchedule.endHour) return false;
  if (careWorkerSchedule.endHour === careWorkerSchedule.startHour) {
    if (careWorkerSchedule.startMinute > careWorkerSchedule.endMinute) return false;
  }
  return true;
};

export const isCareWorkerScheduleRangeValid = (careWorkerSchedule: CareWorkerSchedule) => {
  if (
    careWorkerSchedule.startHour < 9 ||
    careWorkerSchedule.endHour > 18 ||
    (careWorkerSchedule.endHour === 18 && careWorkerSchedule.endMinute > 0)
  )
    return false;

  return true;
};
