import {Timestamp} from 'firebase/firestore';
import {VoteUser} from './VoteUser'; // Import VoteUser from the newly created file

export interface RoomData {
  createdAt: Timestamp;
  createdBy: string;
  users: Record<string, VoteUser>;
}
