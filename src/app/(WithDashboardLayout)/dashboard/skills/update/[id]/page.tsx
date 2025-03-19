import UpdateSkillForm from '@/components/modules/skills/UpdateSkillForm';
import { getSingleSkill } from '@/services/skills';

const UpdateSkillPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: skill } = await getSingleSkill(id)
    return (
        <div>
            <UpdateSkillForm skill={skill}/>
        </div>
    );
};

export default UpdateSkillPage;