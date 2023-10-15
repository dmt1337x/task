import { UserQuery } from '../query/user.query';

export class SpecificPropertyCommand {
  constructor(
    public readonly propertyName: keyof UserQuery,
    public readonly value: string | number
  ) {}
}
