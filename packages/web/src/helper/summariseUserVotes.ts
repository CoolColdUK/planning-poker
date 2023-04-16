import {VoteEnum} from '../enum/VoteEnum';
import {RoomData} from '../interface/RoomData';
import {VoteUser} from '../interface/VoteUser';

export function summariseUserVotes(room: RoomData) {
  const summary: Record<string, number> = {
    [VoteEnum.XS]: 0,
    [VoteEnum.S]: 0,
    [VoteEnum.M]: 0,
    [VoteEnum.L]: 0,
    [VoteEnum.XL]: 0,
    [VoteEnum.SKIP]: 0,
  };

  Object.values(room.users).forEach((user: VoteUser) => {
    if (user.vote) {
      summary[user.vote]++;
    }
  });

  return summary;
}

export type VoteSummary = ReturnType<typeof summariseUserVotes>;
