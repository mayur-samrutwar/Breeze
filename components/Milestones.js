import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DUMMY_MILESTONES = [
  { id: 1, title: "Project Initiation", status: "Completed" },
  { id: 2, title: "Research Phase", status: "In Progress" },
  { id: 3, title: "Data Analysis", status: "Pending" },
  { id: 4, title: "Final Report", status: "Pending" },
];

export default function Milestones({ proposalId }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {DUMMY_MILESTONES.map((milestone) => (
            <li key={milestone.id} className="flex justify-between items-center">
              <span>{milestone.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                milestone.status === 'Completed' ? 'bg-green-200 text-green-800' :
                milestone.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                'bg-gray-200 text-gray-800'
              }`}>
                {milestone.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}