import { getSingleSkill } from "@/services/skills";
import Image from "next/image";

const SkillDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: skill } = await getSingleSkill(id);
    const { name, proficiency, category, experience, icon } = skill;

    return (
        <div className="flex items-center justify-center bg-gray-100 py-12 px-6">
            <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border-2 border-gray-300">
                <div className="flex justify-center mb-6">
                    <Image 
                        src={icon} 
                        alt={name} 
                        width={80} 
                        height={80} 
                        className="rounded-full" 
                    />
                </div>

                <h2 className="text-3xl font-semibold text-center mb-4">{name}</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Proficiency</h3>
                    <p className="text-gray-700">{proficiency}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-medium">Category</h3>
                    <p className="text-gray-700">{category}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-medium">Experience</h3>
                    <p className="text-gray-700">{experience}</p>
                </div>

             
            </div>
        </div>
    );
};

export default SkillDetailsPage;
