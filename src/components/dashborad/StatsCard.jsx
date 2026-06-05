"use client";

import { Card } from "@heroui/react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <Card className="bg-[#111111] border border-zinc-800 rounded-xl p-4 h-full">
      <div className="flex flex-col justify-between h-full min-h-[120px]">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            {Icon && (
              <Icon
                width={18}
                height={18}
                className="text-zinc-400"
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-zinc-500 mb-1">
            {title}
          </p>

          <h3 className="text-2xl font-semibold text-white">
            {value}
          </h3>

          {description && (
            <p className="text-xs text-zinc-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}