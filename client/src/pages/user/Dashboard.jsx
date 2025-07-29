import { useSearchParams } from "react-router-dom";
import { moodThemes } from "../../components/lib/moodTheme";
import RoutineDash from "../../components/dashboard/RoutineDash";
import NutritionDash from "../../components/dashboard/NutritionDash";
import HydrationDash from "../../components/dashboard/HydrationDash";
import MoodDash from "../../components/dashboard/MoodDash";
import Header from "../../components/common/Header";
import Footer from '../../components/common/Footer';

export default function Dashboard({ userName = "User" }) {
  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood") || "default";
  const theme = moodThemes[mood] || moodThemes.default;
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Header />
      <div className={`p-6 font-sans min-h-screen ${theme.bg} ${theme.text}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>
            <p>Track your health & wellness today</p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${userName}&background=000000&color=lime`}
            alt="Profile"
            className="w-14 h-14 rounded-full border border-white"
          />
        </div>

        {/* Mood Dash - Full Width Top */}
        <div className={`mb-6 rounded-xl border shadow ${theme.card}`}>
          <MoodDash userId={userId} mood={mood} />
        </div>

        {/* Routine & Hydration Dash - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`rounded-xl border shadow ${theme.card}`}>
            <RoutineDash userId={userId} mood={mood} />
          </div>
          <div className={`rounded-xl border shadow ${theme.card}`}>
            <HydrationDash userId={userId} mood={mood} />
          </div>
        </div>

        {/* Nutrition Dash - Full Width Bottom */}
        <div className={`rounded-xl border shadow ${theme.card}`}>
          <NutritionDash mood={mood} />
        </div>
      </div>
      <Footer />
    </>
  );
}
