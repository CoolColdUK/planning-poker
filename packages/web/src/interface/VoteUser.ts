// VoteUser.ts
import {User} from 'firebase/auth';

export interface VoteUser extends Pick<User, 'uid' | 'photoURL' | 'displayName'> {
  vote?: string;
}
