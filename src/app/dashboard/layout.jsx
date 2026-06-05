import { DashboardSidebar } from '@/components/dashborad/DashboardSidebar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <aside className="">
                <DashboardSidebar/>
            </aside>
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default DashBoardLayout;