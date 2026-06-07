"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import { LuBriefcaseBusiness, LuCalendarDays } from "react-icons/lu";

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";

  return `${days} days ago`;
}

function formatSalary(min, max, currency) {
  const fmt = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n;

  return `${currency} ${fmt(min)} - ${fmt(max)}`;
}

export default function JobCard({ cardData }) {
  const { jobInfo, company, createdAt } = cardData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card
      variant="secondary"
      className="
      group
      relative
      overflow-hidden
      rounded-[32px]
      border border-white/[0.06]
      bg-gradient-to-b from-zinc-950 to-zinc-900
      p-8
      shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_50px_rgba(0,0,0,0.45)]
      transition-all duration-300
      hover:-translate-y-2
      hover:border-primary/20
      hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]
    "
    >
      {/* Accent line */}
      <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Card.Header>
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Card.Title className="text-2xl font-bold tracking-tight text-white line-clamp-2">
              {jobInfo.title}
            </Card.Title>

            <div className="mt-3 flex items-center gap-3 text-sm text-default-400">
              <span className="font-medium text-default-300">
                {company.companyName}
              </span>

              <div className="h-1 w-1 rounded-full bg-default-600" />

              <div className="flex items-center gap-1">
                <Clock size={12} />
                {mounted ? timeAgo(createdAt) : "Just now"}
              </div>
            </div>
          </div>

          <Chip
            radius="full"
            size="sm"
            className="
            bg-primary/10
            text-primary
            border border-primary/20
            shrink-0
          "
          >
            {jobInfo.category}
          </Chip>
        </div>
      </Card.Header>

      <Card.Content className="mt-8 flex flex-wrap gap-3">
        <Chip
          radius="full"
          size="lg"
          className="
          bg-white/[0.03]
          border border-white/[0.08]
          text-default-300
        "
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            {jobInfo.location?.isRemote
              ? "Remote"
              : `${jobInfo.location?.city}, ${jobInfo.location?.country}`}
          </div>
        </Chip>

        <Chip
          radius="full"
          size="lg"
          className="
          bg-white/[0.03]
          border border-white/[0.08]
          text-default-300
        "
        >
          <div className="flex items-center gap-1.5">
            <LuBriefcaseBusiness size={12} />
            {jobInfo.type}
          </div>
        </Chip>

        <Chip
          radius="full"
          size="lg"
          className="
          bg-emerald-500/10
          border border-emerald-500/20
          text-emerald-400
          font-medium
        "
        >
          {formatSalary(
            jobInfo.salary?.min,
            jobInfo.salary?.max,
            jobInfo.salary?.currency
          )}
        </Chip>

        {jobInfo.deadline && (
          <Chip
            radius="full"
            size="lg"
            className="
            bg-white/[0.03]
            border border-white/[0.08]
            text-default-300
          "
          >
            <div className="flex items-center gap-1.5">
              <LuCalendarDays size={12} />
              {new Date(jobInfo.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </Chip>
        )}
      </Card.Content>

      <Card.Footer className="mt-10 flex items-center justify-between">
        <Button
          variant="light"
          radius="full"
          className="
          px-0
          text-default-200
          font-medium
          group-hover:text-primary
          transition-colors
        "
        >
          Apply Now
          <ArrowRight
            size={16}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />
        </Button>

        <div className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <ArrowRight size={14} />
        </div>
      </Card.Footer>
    </Card>
  );
}