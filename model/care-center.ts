export class CareCenterMeta {
  public readonly id: number;
  public readonly key: string;
  public readonly type: string;
  public readonly value: string;
}

export class CareCenterProperties {
  public readonly id: string;
  public readonly description: string;
  public readonly type: string;
  public readonly name: string;
  public readonly username: string;
  public readonly email: string;
  public readonly homePage: string;
  public readonly zipCode: string;
  public readonly address: string;
  public readonly detailAddress: string;
  public readonly phoneNumber: string;
  public readonly profile: string;
  public readonly careCenterMetas: CareCenterMeta[];
}

export class CareCenter {
  public readonly isValidating: boolean;
  public readonly isLoggedIn: boolean;
  public readonly isLoggedOut: boolean;
  public readonly accessToken: string;
  public readonly expiresIn: Date;
  public readonly careCenter: CareCenterProperties;
}
