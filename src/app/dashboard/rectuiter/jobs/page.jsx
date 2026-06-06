import JobsTable from '@/components/dashborad/JobsTable';
import { getCompanyJobs } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const RecruiterJobs = async() => {
    const user= await getUserSession();
    
    const res=await getCompanyJobs(user?.id)
    console.log(res);
    
    return (
        <div>
            <JobsTable jobs={res}/>
        </div>
    );
};

export default RecruiterJobs;