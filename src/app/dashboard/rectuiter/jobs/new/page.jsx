import React from 'react';
import CreateJobForm from './CreateJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const JobPosts = async() => {
    const companyData=await getLoggedInRecruiterCompany();
    console.log(companyData);
    
    
    return (
        <div>
            <CreateJobForm companyData={companyData}/>
        </div>
    );
};

export default JobPosts;