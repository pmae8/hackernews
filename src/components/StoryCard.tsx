import { HNStory } from "@/types/hn";
import { formatDistanceToNow } from "date-fns";

interface StoryCardProps {
  story: HNStory;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(story.created_at), { addSuffix: true });

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">
        {story.title}
      </h2>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <span className="text-hn-orange">▲</span> {story.points}
        </span>
        <span>•</span>
        <span>by {story.author}</span>
        <span>•</span>
        <span>{timeAgo}</span>
      </div>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-hn-orange hover:underline text-sm font-medium"
      >
        Read more →
      </a>
    </div>
  );
};