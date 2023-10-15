export class UserQuery {
  constructor(
    public readonly id: number,
    public readonly avatar: string,
    public readonly name: string,
    public readonly username: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly website: string
  ) {}
}
