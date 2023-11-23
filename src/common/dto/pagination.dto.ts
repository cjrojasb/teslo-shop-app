import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  // main.ts
  // transform: true,
  // transformOptions: {
  //   enableImplicitConversion: true,
  // },
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
