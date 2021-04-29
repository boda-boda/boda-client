export default class Career {
  public static allArgsConstructor(workplace: string, recepient: string, duration: string) {
    return new Career(workplace, recepient, duration);
  }

  public static noArgsConstructor() {
    return new Career('', '', '');
  }

  public constructor(workplace: any, recepient: any, duration: any) {
    this.workplace = workplace;
    this.recipient = recepient;
    this.duration = duration;
  }
  public workplace: string;
  public recipient: string;
  public duration: string;
}
