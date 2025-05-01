import React from "react";

const FeedShimmer = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-2xl bg-white p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded bg-gray-300" />
              <div className="h-3 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full rounded bg-gray-300" />
            <div className="h-3 w-5/6 rounded bg-gray-300" />
            <div className="h-3 w-2/3 rounded bg-gray-300" />
          </div>
          <div className="mt-4 h-60 w-full rounded-lg bg-gray-300" />
          <div className="mt-4 flex gap-4">
            <div className="h-8 w-20 rounded-full bg-gray-300" />
            <div className="h-8 w-20 rounded-full bg-gray-300" />
            <div className="h-8 w-20 rounded-full bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedShimmer;
