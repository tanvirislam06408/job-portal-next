'use server'
const baseUrl=process.env.NEXT_PUBLIC_URL
export const applyJob = async (applicationData) => {
    const res = await fetch(`${baseUrl}/applications`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
    const data = await res.json();
    return data;
}