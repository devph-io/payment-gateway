import { Entity, Column } from 'typeorm';
import { Base } from './Base';

@Entity()
export class RevokedToken extends Base<RevokedToken> {
  @Column({ unique: true })
  token: string;
}
