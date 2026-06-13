import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}


export const getTokenSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const sessionToken = session?.session?.token
    return sessionToken || null


}



export const checkUserAuthorize = async (role) => {
    const user = await getUserSession();

    if (!user) {
        redirect('/login')
    }

    if (user?.role !== role) {
        return redirect('/unauthorize')
    }

}