// VoteSummaryPieChart.tsx
import {Pie} from 'react-chartjs-2';
import {RoomData} from '../interface/RoomData';
import {summariseUserVotes} from '../utils/utils';

interface VoteSummaryPieChartProps {
  room: RoomData;
}

const VoteSummaryPieChart: React.FC<VoteSummaryPieChartProps> = ({room}) => {
  const summary = summariseUserVotes(room);
  const data = {
    labels: Object.keys(summary),
    datasets: [
      {
        data: Object.values(summary),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default VoteSummaryPieChart;
