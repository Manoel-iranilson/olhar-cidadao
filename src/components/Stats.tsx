import { Card } from "@/components/ui/card";

interface StatsProps {
  resolved: number;
  pending: number;
}

const Stats = ({ resolved, pending }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Denúncias Resolvidas</h3>
        <p className="text-4xl font-bold text-green-500">{resolved}</p>
      </Card>
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Denúncias Pendentes</h3>
        <p className="text-4xl font-bold text-red-500">{pending}</p>
      </Card>
    </div>
  );
};

export default Stats;