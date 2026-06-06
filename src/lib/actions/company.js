'use server'

import { serverMutation } from "../core/serverMutation"

export const createCompany=async(companyData)=>{
const res= await serverMutation('/company',companyData)
console.log(res);
return res;

}

// export const createCompany=async(companyData)=>{
//     const res= await fetch(`${process.env.NEXT_PUBLIC_URL}/company`,{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(companyData)
//     })
//     const data=await res.json();
//     return data;
// } 