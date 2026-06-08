"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import { LuBriefcaseBusiness, LuCalendarDays } from "react-icons/lu";
import Link from "next/link";

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
      variant="flat"
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border border-zinc-800/50
        bg-zinc-900/40
        backdrop-blur-md
        p-6
        transition-all duration-500 ease-out
        hover:-translate-y-1.5
        hover:border-zinc-700
        hover:bg-zinc-900/80
        hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_50px_-10px_rgba(139,92,246,0.15)]
      "
    >
      {/* Decorative Top Hover Glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-1/2 h-20 bg-gradient-to-b from-primary/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <Card.Header className="p-0 flex flex-col gap-4">
        <div className="flex w-full items-start justify-between gap-4">
          {/* Company Initials Avatar / Logo Placeholder */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-base font-bold text-zinc-200 transition-transform duration-500 group-hover:scale-105">
            {company.companyName?.substring(0, 2).toUpperCase()}
          </div>

          <Chip
            radius="full"
            variant="flat"
            size="sm"
            className="bg-primary/10 text-primary border border-primary/20 text-xs font-medium"
          >
            {jobInfo.category}
          </Chip>
        </div>

        <div className="space-y-1.5">
          <Card.Title className="text-xl font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
            {jobInfo.title}
          </Card.Title>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">
              {company.companyName}
            </span>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-zinc-500">
              <Clock size={13} className="text-zinc-500" />
              <span>{mounted ? timeAgo(createdAt) : "Just now"}</span>
            </div>
          </div>
        </div>
      </Card.Header>

      {/* Main Metadata Section */}
      <Card.Content className="p-0 mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-b border-zinc-800/60 py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-zinc-500" />
            <span>
              {jobInfo.location?.isRemote
                ? "Remote"
                : `${jobInfo.location?.city}, ${jobInfo.location?.country}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <LuBriefcaseBusiness size={14} className="text-zinc-500" />
            <span>{jobInfo.type}</span>
          </div>
        </div>

        <Chip
          radius="md"
          size="sm"
          className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs tracking-wide"
        >
          {formatSalary(
            jobInfo.salary?.min,
            jobInfo.salary?.max,
            jobInfo.salary?.currency
          )}
        </Chip>
      </Card.Content>

      <Card.Footer className="p-0 mt-5 flex items-center justify-between">
        {jobInfo.deadline ? (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <LuCalendarDays size={13} />
            <span>
              Closes{" "}
              {new Date(jobInfo.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        ) : (
          <div />
        )}

       <div>
         <Link
        href={`/jobs/${cardData._id}`}
          size="sm"
          radius="full"
          className=" flex items-center py-3 rounded-2xl bg-zinc-800  text-zinc-200  font-medium  px-4 hover:bg-primary hover:text-white  transition-all  duration-300 shadow-sm
          "
        >
          Apply Now
          <ArrowRight
            size={14}
            className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
       </div>
      </Card.Footer>
    </Card>
  );
}