import JobsTable from '@/components/dashborad/JobsTable';
import { getCompanyJobs } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const RecruiterJobs = async () => {
    const user = await getUserSession();
    const res = await getCompanyJobs(user?.id);
    const jobs = Array.isArray(res) ? res : [];

    return (
        <div>
            <JobsTable jobs={jobs} />
        </div>
    );
};

export default RecruiterJobs;