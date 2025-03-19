import ManageAllProjects from "@/components/modules/projects/ManageAllProjects";
import { getAllProjects } from "@/services/project";


const ManageProjectPage = async() => {
    const {data : projects} = await getAllProjects();
    return (
        <div>
            <ManageAllProjects projects={projects}/>
        </div>
    );
};

export default ManageProjectPage;