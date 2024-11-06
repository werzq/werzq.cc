import { Badge } from "@/components/ui/badge";

export default function SkillBadge({ icon: Icon, name, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-full" title={`Visit ${name} official website`}>
      <Badge variant="outline" className="w-full flex items-center gap-2 justify-center py-2 border-dashed bg-zinc-800/30 hover:bg-zinc-700/50 transition-colors duration-300 cursor-pointer">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
        {name}
      </Badge>
    </a>
  );
}
