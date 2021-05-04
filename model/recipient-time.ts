import { DayType } from '../common/types/date';

export class RecipientTime {
  public static noArgsConstructor() {
    return new RecipientTime(0, 0, 0, 0);
  }

  public static allArgsConstructor(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    return new RecipientTime(startHour, startMinute, endHour, endMinute);
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

export const toggleDayOfRecipientTime = (recipientTime: RecipientTime, day: DayType) => {
  if (recipientTime.days.includes(day))
    recipientTime.days = recipientTime.days.filter((includedDay) => includedDay !== day);
  else recipientTime.days.push(day);

  return recipientTime;
};

export const isRecipientTimeValid = (recipientTime: RecipientTime) => {
  if (
    recipientTime.startHour === null ||
    recipientTime.startMinute === null ||
    recipientTime.endHour === null ||
    recipientTime.endMinute === null
  )
    return false;

  if (recipientTime.startHour > recipientTime.endHour) return false;
  if (recipientTime.endHour === recipientTime.startHour) {
    if (recipientTime.startMinute > recipientTime.endMinute) return false;
  }
  return true;
};

export const isRecipientTimeRangeValid = (recipientTime: RecipientTime) => {
  if (
    recipientTime.startHour < 9 ||
    recipientTime.endHour > 18 ||
    (recipientTime.endHour === 18 && recipientTime.endMinute > 0)
  )
    return false;

  return true;
};
