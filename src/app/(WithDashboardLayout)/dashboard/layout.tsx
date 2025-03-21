import ManageDashboardLayout from "@/components/modules/dashboard/DashboardLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ManageDashboardLayout>{children}</ManageDashboardLayout>
        </div>
    );
};

export default DashboardLayout;
