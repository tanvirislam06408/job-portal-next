const baseUrl=process.env.NEXT_PUBLIC_URL

export const getCompanyJobs=async(companyId,status="active")=>{
    const res=await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    const data=await res.json();
    return data;
}