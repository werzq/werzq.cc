"use client"

import PersonalInterestCard from '@/components/PersonalInterestCard';
import SkillBadge from '@/components/SkillBadge';
import { technicalSkills } from '@/constants/technicalSkills';
import { personalInterests } from '@/constants/personalInterests';
import useRandomizedName from '@/hooks/useRandomizedName';
import { Terminal, Briefcase, Code2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function DeveloperProfile() {
  const birthYear = 2007;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  const randomizedName = useRandomizedName();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 transition-colors duration-300 flex items-center justify-center">
      <div className="w-full max-w-4xl p-4 md:p-8 space-y-8 animate-fade-in">
        <header className="flex justify-between items-center">
          <div className="space-y-4">
            <Card className="bg-zinc-800/50 border-none shadow-md">
              <CardContent className="p-4">
                <h1 className="text-3xl md:text-4xl font-mono text-zinc-100 flex items-center gap-2">
                  <Terminal className="w-6 h-6 md:w-8 md:h-8" />
                  Hello there
                </h1>
              </CardContent>
            </Card>
          </div>
        </header>

        {/* Introduction */}
        <div className="space-y-4">
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
            <p className="text-2xl font-mono">My name is {randomizedName}</p>
            <p>I'm a {age}-year-old CS student living in Qatar, passionate about creating open-source tools and exploring innovative tech solutions.</p>
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div>
          <h2 className="text-2xl font-mono mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Hobbies & Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalInterests.map((interest, index) => (
              <PersonalInterestCard key={index} {...interest} />
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-mono mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </h2>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="w-full justify-start bg-zinc-800/50">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="gamemanipulation">Game Modification/Manipulation</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="language">Languages</TabsTrigger>
            </TabsList>
            {Object.entries(technicalSkills).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {items.map(({ name, icon, url }) => (
                    <SkillBadge key={name} name={name} icon={icon} url={url} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <footer className="pt-8 text-center text-sm text-zinc-400">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
