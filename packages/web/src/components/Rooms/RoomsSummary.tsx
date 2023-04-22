import {Typography} from '@mui/material';
import {summariseUserVotes} from '../../helper/summariseUserVotes';
import {RoomData} from '../../interface/RoomData';
import VoteSummaryPieChart from '../VoteSummaryPieChart';

export interface RoomsSummaryProps {
  room: RoomData;
}

export default function RoomsSummary(props: RoomsSummaryProps) {
  const {room} = props;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Vote Summary
      </Typography>
      <VoteSummaryPieChart summary={summariseUserVotes(room)} />
    </>
  );
}
