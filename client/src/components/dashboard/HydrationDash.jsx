import React from "react";

export default function HydrationDash() {
  const hydrationProgress = 100; // example percentage
  const waterGoal = 2000; // in ml

  return (
    <section className="p-6 flex justify-center">
      <div className="bg-[#1f1f1f] rounded-xl shadow-md p-6 w-full max-w-4xl text-gray-300 border border-gray-700">
        <h2 className="text-lg font-semibold text-center mb-6 text-lime-400">
          Staying Hydrated Benefits Infographics
        </h2>

        <div className="flex justify-center items-center relative py-16">
          {/* Left labels */}
          <div className="space-y-6 text-right pr-6 text-sm w-1/3">
            <div>
              <div className="font-bold text-lime-400">40%</div>
              <div className="font-semibold text-white">Mars</div>
              <div className="text-xs text-gray-500">Mars is a cold place, not hot</div>
            </div>
            <div>
              <div className="font-bold text-lime-400">30%</div>
              <div className="font-semibold text-white">Jupiter</div>
              <div className="text-xs text-gray-500">It's a gas giant and the biggest one</div>
            </div>
          </div>

          {/* Glass Visualization */}
          <div className="relative w-32 h-64 bg-gray-800 rounded-b-full border border-gray-600 overflow-hidden shadow-inner">
            <div
              className="absolute bottom-0 w-full bg-lime-400 text-black text-center text-lg font-bold transition-all duration-500"
              style={{ height: `${hydrationProgress}%` }}
            >
              {hydrationProgress}%
            </div>
          </div>

          {/* Right labels */}
          <div className="space-y-6 text-left pl-6 text-sm w-1/3">
            <div>
              <div className="font-bold text-lime-400">20%</div>
              <div className="font-semibold text-white">Venus</div>
              <div className="text-xs text-gray-500">Venus has a beautiful name</div>
            </div>
            <div>
              <div className="font-bold text-lime-400">10%</div>
              <div className="font-semibold text-white">Saturn</div>
              <div className="text-xs text-gray-500">Yes, this is the ringed one</div>
            </div>
          </div>
        </div>

        {/* Hydration Info */}
        <div className="text-sm text-gray-400 mt-6 text-center">
          {hydrationProgress}% of {waterGoal}ml goal
        </div>
        <div className="text-xs text-center text-gray-500 mt-1">
          Stay hydrated – sip hourly!
        </div>
      </div>
    </section>
  );
}
