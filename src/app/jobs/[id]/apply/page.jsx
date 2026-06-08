import NotAuthorized from '@/components/NotAuthorized';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';


const ApplyPage = async({params}) => {
    const {id}=await params;
    const user=await getUserSession();
    if(!user){
        redirect(`/login?redirect=/jobs/${id}/apply`)
    }
    console.log(user.role);
    
    if(user?.role !== 'seeker'){
        return <NotAuthorized/>
    }
    
    return (
        <div>
            apply : {id}
        </div>
    );
};

export default ApplyPage;