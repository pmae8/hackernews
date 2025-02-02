export const StorySkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="flex gap-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </div>
  );
};