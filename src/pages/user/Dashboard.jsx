import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Health & Wellness Dashboard</h1>
        <p className="text-gray-600 mt-1">Track and manage your wellness journey</p>
      </header>

      {/* Dashboard Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Nutrition */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🥗 Nutrition Plans</h2>
          <p className="text-sm text-gray-500 mb-4">View and follow customized diet plans</p>
          <button className="text-green-600 font-medium hover:underline">View Plans →</button>
        </div>

        {/* Daily Routine */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🏃‍♂️ Daily Routine</h2>
          <p className="text-sm text-gray-500 mb-4">Track your yoga, workout & meditation</p>
          <button className="text-blue-600 font-medium hover:underline">Check Routine →</button>
        </div>

        {/* Mood Tracker */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">😊 Mood Tracker</h2>
          <p className="text-sm text-gray-500 mb-4">Log your mood and mental state daily</p>
          <button className="text-purple-600 font-medium hover:underline">Log Mood →</button>
        </div>

        {/* Health & Wellness Tips */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">💪 Health & Wellness</h2>
          <p className="text-sm text-gray-500 mb-4">Explore articles, tips & expert advice</p>
          <button className="text-pink-600 font-medium hover:underline">Explore Tips →</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
