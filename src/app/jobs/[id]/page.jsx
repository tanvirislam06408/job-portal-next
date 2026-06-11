import React from 'react';
import { getSingleJob } from '@/lib/api/job';
import JobHeader from '@/components/JobHeader';
import JobDetailsSection from '@/components/JobDetailsSection';
import CompanyCard from '@/components/CompanyCard';
import JobOverviewSidebar from '@/components/JobOverviewSidebar';

const JobsDetailsPage = async ({ params }) => {
    const { id } = await params;
    console.log('params',id);
    
    const jobData = await getSingleJob(id);
    console.log(jobData);
    
    if (!jobData) {
        return (
            <div className="flex justify-center items-center min-h-[70vh] bg-black">
                <p className="text-xl font-semibold text-zinc-500">Job not found.</p>
            </div>
        );
    }

    const { jobInfo, jobDescription, company,_id } = jobData;

    return (
        <main className="min-h-screen bg-black">
            <div className="relative">
                <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-violet-600/20 blur-[150px] pointer-events-none" />
                <div className="absolute top-1/3 right-0 w-1/3 h-48 bg-indigo-600/10 blur-[120px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 py-8">
                    <JobHeader jobInfo={jobInfo} _id={_id} companyName={company?.companyName} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="lg:col-span-2 space-y-6">
                            <JobDetailsSection
                                title="Job Description & Responsibilities"
                                content={jobDescription?.responsibilities}
                            />
                            <JobDetailsSection
                                title="Requirements"
                                content={jobDescription?.requirements}
                            />
                            <JobDetailsSection
                                title="Benefits & Perks"
                                content={jobDescription?.benefits}
                            />
                        </div>

                        <div className="space-y-6">
                            <JobOverviewSidebar jobInfo={jobInfo} />
                            <CompanyCard company={company} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JobsDetailsPage;
