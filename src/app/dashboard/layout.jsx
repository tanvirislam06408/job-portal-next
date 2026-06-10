import { DashboardSidebar } from '@/components/dashborad/DashboardSidebar';
import { Toast } from '@heroui/react';
import React from 'react';

const DashBoardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Toast.Provider className="bottom-8 right-8" placement="bottom end" />
            <DashboardSidebar />
            <main className="flex-1 overflow-auto pt-14 md:pt-0">
                {children}
            </main>
        </div>
    );
};

export default DashBoardLayout;