export class CreateDeepMatchesDto {
  category!: string;
  timestamp?: number | Date;
  object_id!: number;
  author_id!: number;
  details!: [object, object];
}
