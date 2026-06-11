"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiExternalLink,
  FiMapPin,
  FiSearch,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";
import { updateCompaniesApproval } from "@/lib/api/company";
import { toast } from "@heroui/react";

const statusStyles = {
  approved: {
    label: "Approved",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    dot: "bg-amber-500",
  },
  rejected: {
    label: "Rejected",
    badge: "border-rose-500/20 bg-rose-500/10 text-rose-300",
    dot: "bg-rose-500",
  },
};

const filterOptions = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
];

const sortOptions = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "status", label: "Status" },
];

const getStatus = (status) => status?.toLowerCase() || "pending";

const formatDate = (date) => {
  if (!date) return "No date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "CO";
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function CompaniesReviewClient({ companies = [] }) {
  const [activeStatus, setActiveStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApproved = async (companyId) => {

    const result = await updateCompaniesApproval(companyId, { status: 'Approved' })
    if(result.matchedCount > 0){
      toast.success('Approved Successfully')
    }


  };

  const handleRejected = async (companyId) => {
  const result = await updateCompaniesApproval(companyId, { status: 'Rejected' })
    if(result.matchedCount > 0){
      toast.success('Reject Successfully')
    }

  };

  const counts = useMemo(() => {
    return companies.reduce(
      (acc, company) => {
        const status = getStatus(company.status);
        acc.total += 1;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { total: 0, pending: 0, approved: 0 }
    );
  }, [companies]);

  const visibleCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return companies
      .filter((company) => {
        const status = getStatus(company.status);
        const matchesStatus = activeStatus === "all" || status === activeStatus;
        const matchesSearch =
          !normalizedSearch ||
          company.name?.toLowerCase().includes(normalizedSearch) ||
          company.industry?.toLowerCase().includes(normalizedSearch) ||
          company.location?.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "status") {
          return getStatus(a.status).localeCompare(getStatus(b.status));
        }

        const firstDate = new Date(a.createdAt || 0).getTime();
        const secondDate = new Date(b.createdAt || 0).getTime();
        return sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
      });
  }, [activeStatus, companies, searchTerm, sortBy]);

  return (
    <section className="min-h-screen bg-[#0a0a0c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-7xl"
      >
        <div className="flex flex-col gap-4 border-b border-zinc-900 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-300">Admin review</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
              Companies
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:min-w-[360px]">
            {[
              { label: "Total", value: counts.total, className: "border-zinc-800 bg-zinc-950/70 text-zinc-400" },
              { label: "Pending", value: counts.pending, className: "border-amber-500/20 bg-amber-500/10 text-amber-300" },
              { label: "Approved", value: counts.approved, className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
                className={`rounded-lg border p-3 ${stat.className}`}
              >
                <p className="text-xs font-medium">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveStatus(option.id)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition duration-200 ${activeStatus === option.id
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-200 shadow-[0_0_24px_rgba(139,92,246,0.12)]"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-500 transition focus-within:border-violet-500/50 sm:w-72">
              <FiSearch className="shrink-0" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search company, industry, location"
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600"
              />
            </label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm font-medium text-zinc-300 outline-none transition focus:border-violet-500/50"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.35, delay: 0.14, ease: "easeOut" }}
          className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 shadow-2xl"
        >
          {visibleCompanies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex min-h-72 flex-col items-center justify-center px-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400">
                <FiBriefcase size={22} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">No companies found</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Try a different status filter or search term.
              </p>
            </motion.div>
          ) : (
            <div className="divide-y divide-zinc-900">
              <AnimatePresence mode="popLayout">
                {visibleCompanies.map((company, index) => {
                  const status = getStatus(company.status);
                  const style = statusStyles[status] || statusStyles.pending;

                  return (
                    <motion.article
                      layout
                      key={company._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, delay: index * 0.025, ease: "easeOut" }}
                      className="grid gap-4 px-4 py-4 transition duration-200 hover:bg-zinc-900/60 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] md:items-center md:px-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 bg-cover bg-center text-sm font-semibold text-zinc-300 shadow-inner"
                          style={company.logo ? { backgroundImage: `url(${company.logo})` } : undefined}
                          aria-label={`${company.name || "Company"} logo`}
                        >
                          {!company.logo && getInitials(company.name)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-base font-semibold text-white">
                              {company.name}
                            </h2>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${style.badge}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                              {style.label}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
                            <span className="inline-flex items-center gap-1.5">
                              <FiBriefcase />
                              {company.industry || "No industry"}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <FiMapPin />
                              {company.location || "No location"}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <FiUsers />
                              {company.employeeRange || "No size"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-1 text-sm text-zinc-500 md:justify-self-start">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar />
                          Created {formatDate(company.createdAt)}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">
                          ID {company._id?.slice(-8)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 md:justify-self-end">
                        {company.website && (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-800 px-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                          >
                            <FiExternalLink />
                            Website
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleApproved(company._id)}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 text-sm font-medium text-emerald-200 transition hover:border-emerald-500/40 hover:bg-emerald-500/15"
                        >
                          <FiCheckCircle />
                          Approved
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejected(company._id)}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 text-sm font-medium text-rose-200 transition hover:border-rose-500/40 hover:bg-rose-500/15"
                        >
                          <FiXCircle />
                          Rejected
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
