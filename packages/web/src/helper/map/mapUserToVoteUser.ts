import {User} from 'firebase/auth';
import {VoteUser} from '../../interface/VoteUser'; // Import the VoteUser interface from the separate file you created
import {VoteEnum} from '../../enum/VoteEnum';

export default function mapUserToVoteUser(user: User, vote: VoteEnum = VoteEnum.NOT_VOTED): VoteUser {
  const {uid, displayName} = user;
  const photoURL = user.photoURL || '';
  const voteUser: VoteUser = {uid, displayName, photoURL, vote};
  return voteUser;
}
