import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetClientsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
