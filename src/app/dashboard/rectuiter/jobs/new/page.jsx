import React from 'react';
import CreateJobForm from './CreateJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const JobPosts = async() => {
    const companyData=await getLoggedInRecruiterCompany();
 
    
    return (
        <div>
            <CreateJobForm companyData={companyData}/>
        </div>
    );
};

export default JobPosts;