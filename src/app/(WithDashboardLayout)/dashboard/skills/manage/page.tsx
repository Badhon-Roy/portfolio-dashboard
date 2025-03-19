import ManageAllSkills from "@/components/modules/skills/ManageAllSkills";
import { getAllSkills } from "@/services/skills";


const SkillMangePage = async() => {
    const { data: skills } = await getAllSkills();
    return (
        <div>
          <ManageAllSkills skills={skills}/>
        </div>
    );
};

export default SkillMangePage;