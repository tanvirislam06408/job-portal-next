import { serverFetch } from "@/lib/core/serverMutation";
import { BrowseJobsClient } from "./BrowseJobsClient";

// ─── Server wrapper ────────────────────────────────────────────────────────────
const BrowseJobs = async () => {
  const getAllJobs = await serverFetch("/all-jobs");
  const jobs = Array.isArray(getAllJobs)
    ? getAllJobs
    : getAllJobs?.data ?? getAllJobs?.jobs ?? [];

  return <BrowseJobsClient initialJobs={jobs} />;
};

export default BrowseJobs;