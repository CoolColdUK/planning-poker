import {VoteEnum} from '../enum/VoteEnum';
import {VoteUser} from '../interface/VoteUser';

export default function isUserVoted(user: VoteUser): boolean {
  return !(user.vote === VoteEnum.NOT_VOTED || user.vote === undefined);
}
