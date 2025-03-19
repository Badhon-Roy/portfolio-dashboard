import ManageDashboardLayout from "@/components/modules/dashboard/DashboardLayout";


const DashboardLayout = ({ children }: { children: any }) => {
    return (
        <div>
            <ManageDashboardLayout children={children} />
        </div>
    );
};

export default DashboardLayout;