// VoteUser.ts
import {User} from 'firebase/auth';

export interface VoteUser extends User {
  vote?: string;
}
