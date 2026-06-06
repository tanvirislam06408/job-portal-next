import { DashboardSidebar } from '@/components/dashborad/DashboardSidebar';
import { Toast } from '@heroui/react';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <Toast.Provider className="bottom-8 right-8" placement="bottom end" />
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