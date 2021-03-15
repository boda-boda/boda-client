import { DayType } from '../common/types/date';

export default class CareWorkerSchedule {
  public days: DayType[];
  public startHour: number;
  public startMinute: number;
  public endHour: number;
  public endMinute: number;

  public constructor() {
    this.days = [];
    this.startHour = 0;
    this.startMinute = 0;
    this.endHour = 0;
    this.endMinute = 0;
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
      if (this.startMinute >= this.endMinute) return false;
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
