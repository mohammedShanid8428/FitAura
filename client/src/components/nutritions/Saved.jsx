import React from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Trash, CalendarDays, PlusCircle, Clock } from "lucide-react";

export default function Saved({
  meal,
  onDelete,
  onAdd,
  isPlannerMode = false,
}) {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Recently added";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
      <div className="relative">
        <img
          src={meal.image || meal.imageUrl}
          alt={meal.title}
          className="h-44 w-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/200"; // Fallback image
          }}
        />
        {/* Meal type badge */}
        {meal.mealType && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {meal.mealType}
          </span>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold line-clamp-2">{meal.title}</h3>
          {isPlannerMode ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAdd && onAdd(meal)}
              className="hover:bg-green-50"
              title="Add to planner"
            >
              <PlusCircle className="w-5 h-5 text-green-600" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete && onDelete(meal._id)}
              className="hover:bg-red-50"
              title="Remove from planner"
            >
              <Trash className="w-5 h-5 text-red-500" />
            </Button>
          )}
        </div>

        {/* Benefit/Description */}
        {meal.benefit && (
          <p className="text-sm text-white mb-3 line-clamp-2">
            {meal.benefit}
          </p>
        )}

        {/* Date info */}
        <p className="text-xs text-gray-100 mb-3 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {meal.day ? `Scheduled: ${meal.day}` : formatDate(meal.dateAdded)}
        </p>

        {/* Tags */}
        {meal.tags && meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(meal.tags) ? meal.tags : meal.tags.toString().split(","))
              .slice(0, 3) // Show only first 3 tags
              .map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                >
                  #{typeof tag === 'string' ? tag.trim() : tag}
                </span>
              ))}
            {(Array.isArray(meal.tags) ? meal.tags : meal.tags.toString().split(",")).length > 3 && (
              <span className="text-xs text-gray-500">
                +{(Array.isArray(meal.tags) ? meal.tags : meal.tags.toString().split(",")).length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}