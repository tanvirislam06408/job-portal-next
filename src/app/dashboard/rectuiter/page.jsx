'use client'
import {
    FileText,
    Persons,
    Eye,
    ThunderboltFill
} from "@gravity-ui/icons";

import StatsGrid from '@/components/dashborad/StatsGrid';


const Recruiter = () => {


    const recruiterStats = [
        {
            title: "Total Job Posts",
            value: 48,
            icon: FileText,
        },
        {
            title: "Total Applicants",
            value: "1,284",
            icon: Persons,
        },
        {
            title: "Active Jobs",
            value: 18,
            icon: ThunderboltFill,
        },
        {
            title: "Jobs Closed",
            value: 32,
            icon: Eye,
        },
    ];
    return (
        <div>
            <StatsGrid stats={recruiterStats}/>
        </div>
    );
};

export default Recruiter;