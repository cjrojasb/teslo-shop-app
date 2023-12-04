import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  // main.ts
  // transform: true,
  // transformOptions: {
  //   enableImplicitConversion: true,
  // },
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many roes do you want skip',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
