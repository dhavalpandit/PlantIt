import React from "react";
import { CalendarDays } from "lucide-react";

export default function WeatherForecast({ weather = [] }) {
  if (!weather.length) return null;

  return (
    <div className="my-10">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="text-blue-600" />
        <h2 className="text-2xl font-bold">Upcoming Weather Forecast</h2>
      </div>

      <ul className="space-y-6 border-l-2 border-blue-500 pl-6">
        {weather.map((day, idx) => (
          <li key={idx} className="relative">
            <span className="absolute -left-[11px] top-1.5 h-3 w-3 rounded-full bg-blue-500"> </span>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{day.date}</p>
              <p className="text-gray-700">
                {day.icon} It will be <span className="font-medium">{day.condition.toLowerCase()}</span> with temperatures around <span className="font-medium">{day.temperature}</span>.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
