import NotAuthorized from '@/components/NotAuthorized';
import { getSingleJob } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';
import { serverFetch } from '@/lib/core/serverMutation';
import { getPlanById } from '@/lib/api/plans';


const ApplyPage = async({params}) => {
    const {id}=await params;
    const user=await getUserSession();
    const jobsData=await getSingleJob(id);
        const getJobApplications=await serverFetch(`/job-application?jobId=${user?.id}`)

       const getPlansById=await getPlanById(user?.plans || 'seeker_free');
        

    if(!user){
        redirect(`/login?redirect=/jobs/${id}/apply`)
    }
    console.log(user.role);
    
    if(user?.role !== 'seeker'){
        return <NotAuthorized/>
    }
    
    return (
        <JobApply getPlansById={getPlansById} jobsData={jobsData} applicant={user} getJobApplications={getJobApplications}/>
    );
};

export default ApplyPage;