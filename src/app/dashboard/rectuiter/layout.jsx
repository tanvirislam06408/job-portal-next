import { checkUserAuthorize } from "@/lib/core/session";


const RecruiterLayout = async({children}) => {
    await checkUserAuthorize('recruiter')
    return children
};

export default RecruiterLayout;