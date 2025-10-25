export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  lastLogin: string;
}

export class UserEntity implements User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly createdAt: string,
    public readonly lastLogin: string,
    public readonly company?: string,
    public readonly phone?: string,
    public readonly address?: Address
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromJson(json: any): UserEntity {
    return new UserEntity(
      json.id,
      json.email,
      json.firstName,
      json.lastName,
      json.createdAt,
      json.lastLogin,
      json.company,
      json.phone,
      json.address
    );
  }

  toJson(): User {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      phone: this.phone,
      address: this.address,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin,
    };
  }
}
