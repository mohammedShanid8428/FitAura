// components/ui/ProgressBar.jsx
export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded h-4">
      <div
        className="bg-blue-500 h-4 rounded"
        style={{ width: `${value}%`, transition: "width 0.5s ease" }}
      />
    </div>
  );
}
