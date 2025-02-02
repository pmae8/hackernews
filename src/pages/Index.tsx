import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StoryCard } from "@/components/StoryCard";
import { StorySkeleton } from "@/components/StorySkeleton";
import { HNStory } from "@/types/hn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

const fetchTopStories = async (): Promise<HNStory[]> => {
  const response = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100"
  );
  const data = await response.json();
  return data.hits;
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: stories, isLoading } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });
  const { toast } = useToast();

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Goodbye!",
        description: "You have been logged out.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-orange-500 mb-6">
            Hacker News Top 100
          </h1>
          <div className="w-full max-w-md">
            <Input
              type="search"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <StorySkeleton key={i} />
              ))
            : filteredStories?.map((story) => (
                <StoryCard key={story.objectID} story={story} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Index;