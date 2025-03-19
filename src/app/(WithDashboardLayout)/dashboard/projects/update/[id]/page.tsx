import UpdateProjectForm from "@/components/modules/projects/UpdateProjectForm";
import { getSingleProject } from "@/services/project";

const UpdateProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: project } = await getSingleProject(id)
    return (
        <div>
            <UpdateProjectForm id={id} project={project} />
        </div>
    );
};

export default UpdateProjectPage;