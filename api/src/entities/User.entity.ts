import { Entity, Column, Index } from 'typeorm';
import { Base } from './Base';

/**
 * Note:
 * - AddressClass follows `Provincial` address format of Philippines
 */
class AddressClass {
  streetName?: string;
  houseNumber?: string;
  division?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

class Permissions {
  whiteList: string[];
  blackList: string[];
}

@Entity()
export class User extends Base<User> {
  @Index({ unique: true, where: 'auth IS NOT NULL' })
  @Column({ nullable: true })
  auth?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Index({ unique: true, where: 'reset_password_code IS NOT NULL' })
  @Column({ name: 'reset_password_code', type: 'uuid', nullable: true })
  resetPasswordCode?: string;

  @Index({ unique: true, where: 'account_activation_code IS NOT NULL' })
  @Column({ name: 'account_activation_code', type: 'uuid', nullable: true })
  accountActivationCode?: string;

  @Column({
    name: 'is_confirmed',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isConfirmed?: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column({
    name: 'primary_address',
    type: 'jsonb',
    nullable: true,
    default: JSON.stringify(new AddressClass()),
  })
  primaryAddress?: AddressClass;

  @Column({
    name: 'secondary_address',
    type: 'jsonb',
    nullable: true,
    default: JSON.stringify(new AddressClass()),
  })
  secondaryAddress?: AddressClass;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ name: 'mobile_number', nullable: true })
  mobileNumber?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: JSON.stringify(new AddressClass()),
  })
  permissions?: Permissions;

  @Column({ nullable: true })
  photo?: string;
}
