export const serverMutation = async (url, data, method = 'POST') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
}

export const serverFetch = async (url) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`);
    const resData = await res.json();
    return resData;
}
