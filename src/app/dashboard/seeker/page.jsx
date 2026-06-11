import { serverFetch } from '@/lib/core/serverMutation';
import { getUserSession } from '@/lib/core/session';
import ApplicationsTable from '@/components/dashborad/ApplicationsTable';
import React from 'react';

const SeekerDashboard = async() => {
    const user=await getUserSession();
    const getJobApplications=await serverFetch(`/applied-jobs?applicantId=${user?.id}`)
    console.log('jobs application',getJobApplications);
    
    const applications = Array.isArray(getJobApplications)
        ? getJobApplications
        : getJobApplications?.data || getJobApplications?.applications || [];

    return (
        <ApplicationsTable applications={applications}/>
    );
};

export default SeekerDashboard;
