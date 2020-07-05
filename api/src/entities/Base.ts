import { Column, PrimaryGeneratedColumn, Timestamp, Generated } from 'typeorm';

export class Base<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ default: false })
  disabled: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt?: Timestamp;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt?: Timestamp;

  constructor(partial?: Partial<T>) {
    if (partial) Object.assign(this, partial);
  }
}
