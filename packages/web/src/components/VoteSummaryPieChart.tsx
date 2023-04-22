// PieChartComponent.tsx
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import {VoteSummary} from '../helper/summariseUserVotes';

interface PieChartComponentProps {
  summary: VoteSummary;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff0000', '#a4a4a4', '#0000ff'];

export default function PieChartComponent({summary}: PieChartComponentProps) {
  const data = Object.entries(summary).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({name, percent}) => (percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : '')} // Add this line
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
