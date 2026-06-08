'use server'
const baseUrl=process.env.NEXT_PUBLIC_URL
export const createJobs = async (jobsData) => {
    const res = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(jobsData)
    })
    const data=await res.json();
    return data;
    
}

