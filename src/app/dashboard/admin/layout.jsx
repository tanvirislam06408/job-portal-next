import { checkUserAuthorize } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async({children}) => {
    
    await checkUserAuthorize('admin')
    
    return children;
};

export default AdminLayout;