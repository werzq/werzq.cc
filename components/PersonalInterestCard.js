import { Card, CardContent } from "@/components/ui/card";

export default function PersonalInterestCard({ icon: Icon, name, description }) {
  return (
    <Card className="bg-zinc-800/50 border-dashed border-zinc-700 hover:bg-zinc-800/70 transition-colors duration-300">
      <CardContent className="p-4 flex items-center gap-4 cursor-pointer">
        <Icon className="w-8 h-8 text-zinc-300" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
