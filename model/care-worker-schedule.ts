import { DayType } from '../common/types/date';

export default class CareWorkerSchedule {
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

  public isEmpty() {
    return this.days.length === 0;
  }

  public isValidSchedule() {
    if (
      this.startHour === null ||
      this.startMinute === null ||
      this.endHour === null ||
      this.endMinute === null
    )
      return false;
    if (this.startHour > this.endHour) return false;
    if (this.endHour === this.startHour) {
      if (this.startMinute > this.endMinute) return false;
    }

    return true;
  }

  private addDay(day: DayType) {
    this.days.push(day);
  }

  public isDayIncluded(day: DayType) {
    return this.days.includes(day);
  }

  private removeFromDay(targetDay: DayType) {
    this.days = this.days.filter((day) => day !== targetDay);
  }

  public toggleDay(day: DayType) {
    if (this.days.includes(day)) this.removeFromDay(day);
    else this.addDay(day);
  }
}
