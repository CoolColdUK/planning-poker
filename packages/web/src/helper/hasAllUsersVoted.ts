import {RoomData} from '../interface/RoomData';
import isUserVoted from './isUserVoted';

export function hasAllUsersVoted(room: RoomData): boolean {
  return Object.values(room.users).every(isUserVoted);
}
