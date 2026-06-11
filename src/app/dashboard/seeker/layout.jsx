import { checkUserAuthorize } from '@/lib/core/session';
import React from 'react';

const SeekerLayout = async({children}) => {
    await checkUserAuthorize('seeker')
    return children
};

export default SeekerLayout;