export const serverMutation=async(url,data)=>{
 const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
 });
 const resData=await res.json();
 return resData;
}

export const serverFetch=async(url)=>{
    const res=await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`);
    const resData=await res.json();
    return resData;
}
  