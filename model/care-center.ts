export class CareCenterMeta {
  public readonly id: string;
  public readonly description: string;
  public readonly type: string;
  public readonly name: string;
  public readonly username: string;
  public readonly email: string;
  public readonly homepage: string;
  public readonly zipCode: string;
  public readonly address: string;
  public readonly detailAddress: string;
  public readonly phoneNumber: string;
  public readonly profile: string;
}

export class CareCenter {
  public readonly isValidating: boolean;
  public readonly isLoggedIn: boolean;
  public readonly accessToken: string;
  public readonly expiresIn: Date;
  public readonly careCenter: CareCenterMeta;
}
