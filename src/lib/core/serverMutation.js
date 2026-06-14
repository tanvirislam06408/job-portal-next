import { redirect } from "next/navigation";
import { getTokenSession } from "./session";





const authHeader = async () => {
    const token = await getTokenSession();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}




export const serverMutation = async (url, data, method = 'POST') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data),
    });
    const resData = await res.json();
    handleStatusCode(res)
    return resData;
}

const handleStatusCode=res=>{
    if(res.status ===401){
        redirect('/login')
    }
    else if(res.status === 403){
        redirect('/unauthorize')
    }
}


export const protectRoute = async (path) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${path}`, {
        headers: await authHeader()
    });
    handleStatusCode(res);
    return await res.json()
}

export const serverFetch = async (url) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`);
    const resData = await res.json();
    return resData;
}
