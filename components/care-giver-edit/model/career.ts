export default class Career {
  public static allArgsConstructor(workplace: string, duration: string, memo: string) {
    return new Career(workplace, duration, memo);
  }

  public static noArgsConstructor() {
    return new Career('', '', '');
  }

  public constructor(workplace: any, duration: any, memo: any) {
    this.workplace = workplace;
    this.duration = duration;
    this.memo = memo;
  }
  public workplace: string;
  public duration: string;
  public memo: string;
}
