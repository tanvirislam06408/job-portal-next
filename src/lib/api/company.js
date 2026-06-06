'use server'

export const getCompanyData = async(recruiterId) => {
    const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/company?recruiterId=${recruiterId}`);
    const resData=await res.json();
    console.log("response",resData);
    
    return resData;
};