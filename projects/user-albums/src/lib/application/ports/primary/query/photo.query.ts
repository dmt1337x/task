export class PhotoQuery {
  constructor(
    public readonly author: string,
    public readonly authorId: number,
    public readonly title: string,
    public readonly thumbnailUrl: string,
    public readonly price: number
  ) {}
}
