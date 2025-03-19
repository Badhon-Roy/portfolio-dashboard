"use client";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Github, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProject } from "@/services/project";
import { IProject } from "@/types";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    images: z.array(z.string().url("Invalid image URL")),
    description: z.string().min(10, "Description must be at least 10 characters"),
    frontend: z.string().min(3, "Frontend technology required"),
    backend: z.string().min(3, "Backend technology required"),
    database: z.string().min(2, "Database is required"),
    authentication: z.string().min(2, "Authentication method is required"),
    liveSite: z.string().url("Invalid URL"),
    clientSiteGitHub: z.string().url("Invalid GitHub URL"),
    serverSiteGitHub: z.string().url("Invalid GitHub URL"),
    keyFeatures: z.array(z.string().min(5, "Each feature must be at least 5 characters")),
});

const UpdateProjectForm = ({ id, project }: { id: string, project: IProject }) => {
    const [selectedProjectType, setSelectedProjectType] = useState(project?.projectType as string);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project?.name,
            images: project?.images,
            description: project?.description,
            frontend: project?.technologiesUsed.frontend.join(", "),
            backend: project?.technologiesUsed.backend.join(", "),
            database: project?.technologiesUsed.database,
            authentication: project?.technologiesUsed.authentication,
            liveSite: project?.liveSite,
            clientSiteGitHub: project?.clientSiteGitHub,
            serverSiteGitHub: project?.serverSiteGitHub,
            keyFeatures: project?.keyFeatures
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Updating...");
        const frontendTech = data?.frontend.split(",").map((tech: string) => tech.trim());
        const backendTech = data?.backend.split(",").map((tech: string) => tech.trim());
        const formattedData = {
            name: data.name,
            images: [data.images[0], data.images[1], data.images[2]],
            description: data.description,
            technologiesUsed: {
                frontend: frontendTech,
                backend: backendTech,
                database: data.database,
                authentication: data.authentication,
            },
            projectType: selectedProjectType,
            liveSite: data.liveSite,
            clientSiteGitHub: data.clientSiteGitHub,
            serverSiteGitHub: data.serverSiteGitHub,
            keyFeatures: [data.keyFeatures[0], data.keyFeatures[1], data.keyFeatures[2]],
        };

        try {
            const res = await updateProject(id, formattedData);
            if (res.success) {
                toast.success(res?.message, { id: toastLoading });
                reset();
                router.push('/dashboard/projects/manage')
            } else {
                toast.error(res?.message, { id: toastLoading });
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", { id: toastLoading });
        }
    };

    // Handle changes for project type selection
    const handleProjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProjectType(event.target.value);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border-2 border-white">
                <h2 className="text-3xl font-bold text-center mb-5">Update Project</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center justify-between gap-8">
                        {/* Project Name */}
                        <div className="w-3/5">
                            <label className="mb-2 font-medium text-gray-700 block">Project Name</label>
                            <input
                                {...register("name")}
                                className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="Enter project name"
                            />
                            {errors.name && <p className="text-red-300 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Project Type */}
                        <div className="w-2/5">
                            <label htmlFor="projectType" className="mb-2 font-medium text-gray-700 block">
                                Project Type
                            </label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={selectedProjectType}
                                onChange={handleProjectTypeChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Project Type</option>
                                <option value="personal">Personal</option>
                                <option value="team">Team</option>
                            </select>
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Project Image URL</label>
                        <div className="flex gap-8">
                            {[...Array(3)].map((_, i) => (
                                <input
                                    key={i}
                                    {...register(`images.${i}`)}
                                    className={`w-full px-4 py-2 border ${errors.images ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                    placeholder={`Image ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Description</label>
                        <textarea
                            {...register("description")}
                            className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Brief description"
                        />
                        {errors.description && <p className="text-red-300 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Technologies Used */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Frontend</label>
                            <input
                                {...register("frontend")}
                                className={`w-full px-4 py-2 border ${errors.frontend ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="React, Vue, etc."
                            />
                            {errors.frontend && <p className="text-red-300 text-sm">{errors.frontend.message}</p>}
                        </div>

                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Backend</label>
                            <input
                                {...register("backend")}
                                className={`w-full px-4 py-2 border ${errors.backend ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="Node.js, Django, etc."
                            />
                            {errors.backend && <p className="text-red-300 text-sm">{errors.backend.message}</p>}
                        </div>

                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Database</label>
                            <input
                                {...register("database")}
                                className={`w-full px-4 py-2 border ${errors.database ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="MongoDB, MySQL, etc."
                            />
                            {errors.database && <p className="text-red-300 text-sm">{errors.database.message}</p>}
                        </div>

                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Authentication</label>
                            <input
                                {...register("authentication")}
                                className={`w-full px-4 py-2 border ${errors.authentication ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="JWT, Firebase, etc."
                            />
                            {errors.authentication && <p className="text-red-300 text-sm">{errors.authentication.message}</p>}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Live Site</label>
                            <div className="flex items-center space-x-2">
                                <Globe className="" />
                                <input
                                    {...register("liveSite")}
                                    className={`w-full px-4 py-2 border ${errors.liveSite ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                    placeholder="https://project-live.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Client GitHub</label>
                            <div className="flex items-center space-x-2">
                                <Github className="" />
                                <input
                                    {...register("clientSiteGitHub")}
                                    className={`w-full px-4 py-2 border ${errors.clientSiteGitHub ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                    placeholder="https://github.com/project-client"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 font-medium text-gray-700 block">Server GitHub</label>
                            <div className="flex items-center space-x-2">
                                <Github className="" />
                                <input
                                    {...register("serverSiteGitHub")}
                                    className={`w-full px-4 py-2 border ${errors.serverSiteGitHub ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                    placeholder="https://github.com/project-server"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Key Features</label>
                        <div className="flex gap-8">
                            {[...Array(3)].map((_, i) => (
                                <input
                                    key={i}
                                    {...register(`keyFeatures.${i}`)}
                                    className={`w-full px-4 py-2 border ${errors.keyFeatures ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                    placeholder={`Feature ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#019fc7] text-white font-medium py-2 rounded-lg hover:bg-[#019fc7] focus:outline-none cursor-pointer">Update Project</Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProjectForm;
