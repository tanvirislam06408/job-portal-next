import NotAuthorized from '@/components/NotAuthorized';
import { getSingleJob } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';
import { serverFetch } from '@/lib/core/serverMutation';


const ApplyPage = async({params}) => {
    const {id}=await params;
    const user=await getUserSession();
    const jobsData=await getSingleJob(id);
        const getJobApplications=await serverFetch(`/job-application?jobId=${user?.id}`)
       

    if(!user){
        redirect(`/login?redirect=/jobs/${id}/apply`)
    }
    console.log(user.role);
    
    if(user?.role !== 'seeker'){
        return <NotAuthorized/>
    }
    
    return (
        <JobApply jobsData={jobsData} applicant={user} getJobApplications={getJobApplications}/>
    );
};

export default ApplyPage;