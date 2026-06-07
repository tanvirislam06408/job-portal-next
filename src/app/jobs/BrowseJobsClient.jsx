"use client";

import { Card, Checkbox, CheckboxGroup, Button, Pagination } from "@heroui/react";
import {
  FiSearch,
  FiBookmark,
  FiChevronDown,
  FiFilter,
  FiX,
} from "react-icons/fi";
import {
  MdOutlineAttachMoney,
  MdOutlineAccessTime,
  MdOutlineLocationOn,
  MdOutlineFlashOn,
  MdOutlineStars,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { useState } from "react";

// ─── Badge components ─────────────────────────────────────────────────────────

function SalaryBadge({ min, max, currency = "USD" }) {
  if (!min && !max) return null;
  const sym = currency === "USD" ? "$" : currency;
  const fmt = (n) => (n >= 1000 ? `${sym}${Math.round(n / 1000)}k` : `${sym}${n}`);
  const label = min && max ? `${fmt(min)} - ${fmt(max)}` : min ? `${fmt(min)}+` : `Up to ${fmt(max)}`;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg bg-emerald-950/30 text-emerald-400 text-[12px] font-normal border border-emerald-500/20">
      <MdOutlineAttachMoney size={13} />
      {label}
    </span>
  );
}

function JobTypeBadge({ type }) {
  if (!type) return null;

  const styles = {
    "Full-time":  { bg: "bg-blue-950/30", text: "text-blue-400", border: "border-blue-500/20", icon: <MdOutlineAccessTime size={12} /> },
    "Part-time":  { bg: "bg-violet-950/30", text: "text-violet-400", border: "border-violet-500/20", icon: <MdOutlineAccessTime size={12} /> },
    Contract:     { bg: "bg-amber-950/30", text: "text-amber-400", border: "border-amber-500/20", icon: <MdOutlineWorkOutline size={12} /> },
    Freelance:    { bg: "bg-rose-950/30", text: "text-rose-400", border: "border-rose-500/20", icon: <MdOutlineWorkOutline size={12} /> },
    Hybrid:       { bg: "bg-cyan-950/30", text: "text-cyan-400", border: "border-cyan-500/20", icon: <MdOutlineLocationOn size={12} /> },
    Internship:   { bg: "bg-pink-950/30", text: "text-pink-400", border: "border-pink-500/20", icon: <MdOutlineWorkOutline size={12} /> },
  };

  const s = styles[type] || styles["Full-time"];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg ${s.bg} ${s.text} text-[12px] font-normal border ${s.border}`}>
      {s.icon}
      {type}
    </span>
  );
}

function EasyApplyBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg bg-emerald-950/30 text-emerald-400 text-[12px] font-normal border border-emerald-500/20">
      <MdOutlineFlashOn size={13} />
      Easy Apply
    </span>
  );
}

function HotJobBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg bg-orange-950/30 text-orange-400 text-[12px] font-normal border border-orange-500/20">
      <MdOutlineFlashOn size={13} />
      Hot Job
    </span>
  );
}

function SeniorBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg bg-purple-950/30 text-purple-400 text-[12px] font-normal border border-purple-500/20">
      <MdOutlineStars size={12} />
      Senior
    </span>
  );
}

// ─── Company logo square ───────────────────────────────────────────────────────
function CompanyLogo({ name }) {
  const initial = name?.charAt(0)?.toUpperCase() ?? "C";
  const colors = [
    "from-blue-600/40 to-blue-900/40 border-blue-500/20",
    "from-emerald-600/40 to-emerald-900/40 border-emerald-500/20",
    "from-rose-600/40 to-rose-900/40 border-rose-500/20",
    "from-violet-600/40 to-violet-900/40 border-violet-500/20",
    "from-amber-600/40 to-amber-900/40 border-amber-500/20",
  ];
  const idx = (initial.charCodeAt(0) ?? 0) % colors.length;
  return (
    <div className={`w-[46px] h-[46px] rounded-xl bg-gradient-to-br ${colors[idx]} border flex items-center justify-center flex-shrink-0 backdrop-blur-xl`}>
      <span className="text-white text-[17px] font-semibold">{initial}</span>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const { jobInfo, company, createdAt } = job;
  const { title, type, salary, location } = jobInfo;

  const locationLabel = location?.isRemote
    ? "Remote"
    : [location?.city, location?.country].filter(Boolean).join(", ");

  const [now] = useState(() => Date.now());
  const daysOld = createdAt
    ? (now - new Date(createdAt).getTime()) / 864e5
    : 999;
  const isHot = daysOld <= 3;
  const isSenior =
    title?.toLowerCase().includes("senior") ||
    title?.toLowerCase().includes("lead") ||
    title?.toLowerCase().includes("sr.");
  const isEasyApply = type === "Full-time";

  return (
    <Card className="w-full rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-950 to-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)] group">
      <Card.Content className="px-5 py-4">
        <div className="flex items-start gap-4">
          <CompanyLogo name={company?.companyName} />

          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-[15px] leading-tight group-hover:text-violet-400 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-zinc-400 text-[13px] mt-[3px]">
                  {company?.companyName}
                  {locationLabel && (
                    <>
                      <span className="mx-1 text-zinc-600">•</span>
                      <span>{locationLabel}</span>
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() => setSaved((s) => !s)}
                className="mt-0.5 flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
                aria-label={saved ? "Unsave job" : "Save job"}
              >
                <FiBookmark
                  size={18}
                  className={saved ? "fill-violet-400 stroke-violet-400" : ""}
                />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-[7px] mt-3">
              <SalaryBadge
                min={salary?.min}
                max={salary?.max}
                currency={salary?.currency}
              />
              {isEasyApply && <EasyApplyBadge />}
              {type && !isEasyApply && <JobTypeBadge type={type} />}
              {type && isEasyApply && <JobTypeBadge type={type} />}
              {location?.isRemote && type !== "Full-time" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-[5px] rounded-lg bg-cyan-950/30 text-cyan-400 text-[12px] border border-cyan-500/20">
                  <MdOutlineLocationOn size={12} />
                  Remote
                </span>
              )}
              {type === "Contract" && (
                <JobTypeBadge type="Contract" />
              )}
              {isSenior && <SeniorBadge />}
              {isHot && <HotJobBadge />}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
function FilterSidebar({ jobs, selectedTypes, setSelectedTypes, mobileOpen, onClose }) {
  const typeCounts = jobs.reduce((acc, job) => {
    const t = job.jobInfo?.type;
    if (t) acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const formatCount = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")}k` : `${n}`;

  const content = (
    <Card className="rounded-2xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl">
      <Card.Content className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-[15px]">Filters</h2>
          {onClose && (
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors lg:hidden">
              <FiX size={18} />
            </button>
          )}
        </div>
        <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider mb-3">
          Job Type
        </p>
        <CheckboxGroup
          value={selectedTypes}
          onChange={setSelectedTypes}
          className="gap-[10px]"
        >
          {Object.entries(typeCounts).map(([type, count]) => (
            <Checkbox
              key={type}
              value={type}
              size="sm"
              classNames={{
                base: "max-w-full",
                label: "text-[13px] text-zinc-300 w-full",
                wrapper: "border-zinc-600 group-data-[selected=true]:border-violet-500 group-data-[selected=true]:bg-violet-500/10",
              }}
            >
              <span className="flex items-center justify-between w-full pr-1">
                <span>{type}</span>
                <span className="text-zinc-500 text-[12px] ml-2">
                  {formatCount(count)}
                </span>
              </span>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Card.Content>
    </Card>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[200px] xl:w-[220px] flex-shrink-0">
        {content}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] p-4 overflow-y-auto animate-in slide-in-from-left duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Client Shell ─────────────────────────────────────────────────────────────
const JOBS_PER_PAGE = 5;

export const BrowseJobsClient = ({ initialJobs }) => {
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const jobs = Array.isArray(initialJobs) ? initialJobs : [];

  const filtered = jobs.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      job.jobInfo?.title?.toLowerCase().includes(q) ||
      job.company?.companyName?.toLowerCase().includes(q) ||
      job.jobInfo?.category?.toLowerCase().includes(q);
    const matchType =
      selectedTypes.length === 0 || selectedTypes.includes(job.jobInfo?.type);
    return matchSearch && matchType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "salary") return (b.jobInfo?.salary?.max ?? 0) - (a.jobInfo?.salary?.max ?? 0);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / JOBS_PER_PAGE));
  const paginated = sorted.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  const handleSearch = () => {
    setSearch(inputVal);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] px-4 sm:px-6 py-6 sm:py-8 ">
      {/* Decorative glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 blur-3xl rounded-full" />

      {/* ── Search bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8 container  mx-auto relative z-10">
        <div className="flex-1 flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 h-[50px] focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-violet-500/10 transition-all duration-200">
          <FiSearch className="text-zinc-500 flex-shrink-0" size={16} />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by job title, keywords..."
            className="flex-1 bg-transparent text-white placeholder:text-zinc-600 text-[14px] outline-none"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onPress={handleSearch}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold h-[50px] rounded-xl text-[14px] px-6 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-w-fit flex-1 sm:flex-none"
          >
            <FiSearch size={15} className="sm:hidden" />
            <span className="hidden sm:inline">Search Jobs</span>
          </Button>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden h-[50px] w-[50px] flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all duration-200"
          >
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex gap-6 container mx-auto relative z-10">
        {/* Sidebar */}
        <FilterSidebar
          jobs={jobs}
          selectedTypes={selectedTypes}
          setSelectedTypes={(v) => { setSelectedTypes(v); setPage(1); }}
          mobileOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Job list */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <p className="text-zinc-300 font-semibold text-[14px]">
              Found{" "}
              <span className="text-white">{filtered.length.toLocaleString()}</span>{" "}
              Professional Jobs
            </p>
            <div className="flex items-center gap-1 text-[13px] text-zinc-500">
              <span>Sort by:</span>
              <div className="relative ml-1">
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="appearance-none bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[13px] pl-3 pr-7 py-1.5 rounded-lg outline-none cursor-pointer hover:border-violet-500/30 transition-colors duration-200"
                >
                  <option value="recent" className="bg-zinc-900">Most Recent</option>
                  <option value="salary" className="bg-zinc-900">Highest Salary</option>
                </select>
                <FiChevronDown
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[10px]">
            {paginated.length > 0 ? (
              paginated.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <FiSearch size={24} className="text-zinc-500" />
                </div>
                <p className="text-zinc-400 text-sm font-medium">No jobs found</p>
                <p className="text-zinc-600 text-[13px] mt-1">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                page={page}
                onChange={(p) => { setPage(p); }}
                showControls
                siblings={1}
                boundaries={1}
                classNames={{
                  wrapper: "gap-1",
                  item: "w-9 h-9 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-400 text-[13px] hover:bg-white/10 hover:text-white transition-all duration-200",
                  cursor: "w-9 h-9 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-[13px] shadow-lg shadow-violet-600/25",
                  prev: "w-9 h-9 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all duration-200",
                  next: "w-9 h-9 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all duration-200",
                  ellipsis: "text-zinc-500",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
