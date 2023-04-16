import {User} from 'firebase/auth';
import {VoteUser} from '../interface/VoteUser'; // Import the VoteUser interface from the separate file you created

export default function mapUserToVoteUser(user: User, vote?: string | 'skip'): VoteUser {
  const {uid, displayName, photoURL} = user;
  const voteUser: VoteUser = {uid, displayName, photoURL, vote};
  return voteUser;
}
