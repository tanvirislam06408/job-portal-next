import { getAllCompanies } from '@/lib/api/company';
import React from 'react';
import CompaniesReviewClient from './CompaniesReviewClient';

const CompaniesReview = async() => {
    const companies = await getAllCompanies();
    
    return (
        <CompaniesReviewClient companies={companies || []} />
    );
};

export default CompaniesReview;
