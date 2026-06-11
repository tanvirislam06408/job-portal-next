import React from 'react';
import CreateJobForm from './CreateJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const JobPosts = async() => {
    const companyData=await getLoggedInRecruiterCompany();
    const isApproved = companyData?.status?.toLowerCase() === 'approved';
    
    return (
        <div>
            {
                isApproved ? (
                    <CreateJobForm companyData={companyData}/>
                ) : (
                    <div className="max-w-4xl mx-auto my-10 px-4">
                        <div className="rounded-xl border border-default-200 bg-default-50 p-6 text-center">
                            <h1 className="text-xl font-semibold text-default-800">Company approval required</h1>
                            <p className="mt-2 text-sm text-default-500">
                                Your company profile must be approved before you can create a job post.
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default JobPosts;
