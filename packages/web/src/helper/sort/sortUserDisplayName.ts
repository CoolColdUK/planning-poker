import {User} from 'firebase/auth';
import {VoteUser} from '../../interface/VoteUser';

export default function sortUserDisplayName(a: User | VoteUser, b: User | VoteUser) {
  return (a.displayName as string) > (b.displayName as string) ? 1 : -1;
}
