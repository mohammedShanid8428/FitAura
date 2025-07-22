import React from "react";

export default function HydrationDash() {
  const hydrationProgress = 100; // you can replace with actual state
  const waterGoal = 2000; // ml

  return (
    <section className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6  w-full max-w-4xl text-gray-800">
        <h2 className="text-lg font-semibold text-center mb-6">
          Staying Hydrated Benefits Infographics
        </h2>

        <div className="flex justify-center items-center relative py-16">
          {/* Left labels */}
          <div className="space-y-6 text-right pr-6 text-sm w-1/3">
            <div>
              <div className="font-bold text-blue-500">40%</div>
              <div className="font-semibold">Mars</div>
              <div className="text-xs text-gray-500">Mars is a cold place, not hot</div>
            </div>
            <div>
              <div className="font-bold text-blue-500">30%</div>
              <div className="font-semibold">Jupiter</div>
              <div className="text-xs text-gray-500">It's a gas giant and the biggest one</div>
            </div>
          </div>

          {/* Glass */}
          <div className="relative w-32 h-64 bg-blue-100 rounded-b-full border border-blue-300 overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-blue-500 text-white text-center text-lg font-bold"
              style={{ height: `${hydrationProgress}%` }}
            >
              {hydrationProgress}%
            </div>
          </div>

          {/* Right labels */}
          <div className="space-y-6 text-left pl-6 text-sm w-1/3">
            <div>
              <div className="font-bold text-blue-500">20%</div>
              <div className="font-semibold">Venus</div>
              <div className="text-xs text-gray-500">Venus has a beautiful name</div>
            </div>
            <div>
              <div className="font-bold text-blue-500">10%</div>
              <div className="font-semibold">Saturn</div>
              <div className="text-xs text-gray-500">Yes, this is the ringed one</div>
            </div>
          </div>
        </div>

        {/* Progress label */}
        <div className="text-sm text-gray-600 mt-6 text-center">
          {hydrationProgress}% of {waterGoal}ml goal
        </div>
        <div className="text-xs text-center text-gray-500 mt-1">
          Drink water every hour!
        </div>
      </div>
    </section>
  );
}
