import React from "react";
import { Trash2, Clock, Tag } from "lucide-react";

const fallbackImages = {
  breakfast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY5NTAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5CcmVha2Zhc3Q8L3RleHQ+Cjwvc3ZnPg==',
  lunch: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzRBODUzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MdW5jaDwvdGV4dD4KPC9zdmc+',
  dinner: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzAzN0ZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EaW5uZXI8L3RleHQ+Cjwvc3ZnPg==',
  snacks: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY2NkI5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TbmFja3M8L3RleHQ+Cjwvc3ZnPg==',
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NZWFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
};

const getFallbackImage = (mealType) => {
  return fallbackImages[mealType] || fallbackImages.default;
};

export default function Saved({ meal, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPrimaryMealType = (mealTypes) => {
    if (!mealTypes) return 'general';
    if (Array.isArray(mealTypes)) {
      return mealTypes[0] || 'general';
    }
    return mealTypes;
  };

  const displayMealTypes = (mealTypes) => {
    if (!mealTypes) return ['General'];
    if (Array.isArray(mealTypes)) {
      return mealTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1));
    }
    return [mealTypes.charAt(0).toUpperCase() + mealTypes.slice(1)];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={meal.imageUrl || getFallbackImage(getPrimaryMealType(meal.mealType))}
          alt={meal.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = getFallbackImage(getPrimaryMealType(meal.mealType));
          }}
        />
        <div className="absolute top-2 right-2 flex flex-wrap gap-1">
          {displayMealTypes(meal.mealType).slice(0, 2).map((type, index) => (
            <span
              key={index}
              className="bg-black/70 text-white text-xs px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
          {displayMealTypes(meal.mealType).length > 2 && (
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              +{displayMealTypes(meal.mealType).length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {meal.title}
        </h3>

        {meal.benefit && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {meal.benefit}
          </p>
        )}

        {meal.tags && meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            <Tag className="w-3 h-3 text-gray-400 mt-1" />
            {meal.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {meal.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{meal.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(meal.dateAdded || meal.createdAt)}
          </div>

          <button
            onClick={() => onDelete(meal._id)}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs transition-colors duration-200"
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}