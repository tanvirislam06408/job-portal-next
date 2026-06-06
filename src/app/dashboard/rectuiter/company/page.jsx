import React from 'react';
import CompanyPage from './CompanyPage';
import { getUserSession } from '@/lib/core/session';

const CompanyHomePage = async() => {
    const user=await getUserSession();
    
    
    return (
        <div>
            <CompanyPage recruiter={user}/>
        </div>
    );
};

export default CompanyHomePage;