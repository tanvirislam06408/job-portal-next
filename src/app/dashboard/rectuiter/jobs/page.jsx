import JobsTable from '@/components/dashborad/JobsTable';
import { getCompanyJobs } from '@/lib/api/job';
import React from 'react';

const RecruiterJobs = async() => {
    const companyId='comp_987654321'
    const res=await getCompanyJobs(companyId)
    console.log(res);
    
    return (
        <div>
            <JobsTable jobs={res}/>
        </div>
    );
};

export default RecruiterJobs;