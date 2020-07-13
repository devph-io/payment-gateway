import {
  IsString,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsISO8601,
  IsUUID,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Expose, Type, Transform } from 'class-transformer';

class GenericAddressInput {
  @IsString()
  @IsOptional()
  streetName?: string;

  @IsString()
  @IsOptional()
  houseNumber?: string;

  @IsString()
  @IsOptional()
  division?: string;

  @IsString()
  @IsOptional()
  barangay?: string;

  @IsString()
  @IsOptional()
  municipality?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class CreateUserInput {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullname?: string;

  @ValidateNested({ each: true })
  @Type(() => GenericAddressInput)
  @IsOptional()
  primaryAddress?: GenericAddressInput;

  @ValidateNested({ each: true })
  @Type(() => GenericAddressInput)
  @IsOptional()
  secondaryAddress?: GenericAddressInput;

  @IsISO8601({ strict: true })
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  mobileNumber?: string;
}

export class GenericUserClass {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  uuid: string;

  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullname?: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => GenericAddressInput)
  @IsOptional()
  primaryAddress?: GenericAddressInput;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => GenericAddressInput)
  @IsOptional()
  secondaryAddress?: GenericAddressInput;

  @Expose()
  @IsISO8601({ strict: true })
  @IsOptional()
  birthDate?: Date;

  @Expose()
  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  disabled: boolean;
}
