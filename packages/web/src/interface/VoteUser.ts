// VoteUser.ts
import {User} from 'firebase/auth';
import {VoteEnum} from '../enum/VoteEnum';

export interface VoteUser extends Pick<User, 'uid' | 'photoURL' | 'displayName'> {
  vote: VoteEnum;
}
