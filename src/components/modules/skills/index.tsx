"use client";

import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSkill } from "@/services/skills"; // Replace with your actual function for skill creation

const skillSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {required_error : "Proficiency is required"}),
    category: z.enum([
        "Programming Languages",
        "Frontend Frameworks",
        "Backend Technologies",
        "Databases",
        "CSS Frameworks",
        "Tools",
    ], {required_error : "Category is required"}),
    experience: z.string().min(1, "Experience must be at least 1 characters"),
    icon: z.string().url("Invalid icon URL"),
});

const ManageSkillCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm({
        resolver: zodResolver(skillSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastLoading = toast.loading("Adding...");
        const formattedData = {
            name: data.name,
            proficiency: data.proficiency,
            category: data.category,
            experience: data.experience,
            icon: data.icon,
        };

        try {
            const res = await createSkill(formattedData); // Replace with your actual function to create the skill
            if (res.success) {
                toast.success(res?.message, { id: toastLoading });
                reset();
            } else {
                toast.error(res?.message, { id: toastLoading });
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", { id: toastLoading });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border-2 border-white">
                <h2 className="text-3xl font-bold text-center mb-5">Add a Skill</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="md:flex items-center justify-between gap-8">
                        {/* Name */}
                        <div className="flex-1">
                            <label className="mb-2 font-medium text-gray-700 block">Skill Name</label>
                            <input
                                {...register("name")}
                                className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="Enter skill name"
                            />
                            {errors.name && <p className="text-red-300 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Proficiency */}
                        <div className="flex-1 md:mt-0 mt-4">
                            <label htmlFor="proficiency" className="mb-2 font-medium text-gray-700 block">
                                Proficiency
                            </label>
                            <select
                                {...register("proficiency")}
                                className={`w-full px-4 py-2 border ${errors.proficiency ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            >
                                <option value="">Select proficiency level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                            {errors.proficiency && <p className="text-red-300 text-sm">{errors.proficiency.message}</p>}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Category</label>
                        <select
                            {...register("category")}
                            className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                        >
                            <option value="">Select category</option>
                            <option value="Programming Languages">Programming Languages</option>
                            <option value="Frontend Frameworks">Frontend Frameworks</option>
                            <option value="Backend Technologies">Backend Technologies</option>
                            <option value="Databases">Databases</option>
                            <option value="CSS Frameworks">CSS Frameworks</option>
                            <option value="Tools">Tools</option>
                        </select>
                        {errors.category && <p className="text-red-300 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Experience</label>
                        <textarea
                            {...register("experience")}
                            className={`w-full px-4 py-2 border ${errors.experience ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Describe your experience with this skill"
                        />
                        {errors.experience && <p className="text-red-300 text-sm">{errors.experience.message}</p>}
                    </div>

                    {/* Icon URL */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Icon Image URL</label>
                        <input
                            {...register("icon")}
                            className={`w-full px-4 py-2 border ${errors.icon ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Enter icon image URL"
                        />
                        {errors.icon && <p className="text-red-300 text-sm">{errors.icon.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#019fc7] text-white font-medium py-2 rounded-lg hover:bg-[#019fc7] focus:outline-none cursor-pointer">
                        Add Skill
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ManageSkillCreate;
