"use client";

import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createBlog } from "@/services/blog";

const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tags: z.string().min(1, "Tag must be at least 1 character"),
    category: z.string().min(2, "Category is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    thumbnail: z.string().url("Invalid thumbnail URL"),
});

const ManageBlogCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm({
        resolver: zodResolver(blogSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastLoading = toast.loading("Adding...")
        const tags = data?.tags.split(",").map((tag: string) => tag.trim());
        const formattedData = {
            title: data.title,
            tags: tags,
            category: data?.category,
            content: data.content,
            thumbnail: data.thumbnail,
        };

        try {
            const res = await createBlog(formattedData)
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
                reset();
            } else {
                toast.error(res?.message, { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", { id: toastLoading })
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border-2 border-white">
                <h2 className="text-3xl font-bold text-center mb-5">Add a Blog Post</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center justify-between gap-8">
                        {/* Title */}
                        <div className="flex-1">
                            <label className="mb-2 font-medium text-gray-700 block">Blog Post Title</label>
                            <input
                                {...register("title")}
                                className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="Enter blog title"
                            />
                            {errors.title && <p className="text-red-300 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div className="flex-1">
                            <label htmlFor="category" className="mb-2 font-medium text-gray-700 block">
                                Category
                            </label>
                            <input
                                {...register("category")}
                                className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                                placeholder="Enter blog category"
                            />
                            {errors.category && <p className="text-red-300 text-sm">{errors.category.message}</p>}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Tags</label>
                        <input
                            {...register("tags")}
                            className={`w-full px-4 py-2 border ${errors.tags ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Web Development, AI, Technology"
                        />
                        {errors.tags && <p className="text-red-300 text-sm">{errors.tags.message}</p>}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Content</label>
                        <textarea
                            {...register("content")}
                            className={`w-full px-4 py-2 border ${errors.content ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Write blog content here"
                        />
                        {errors.content && <p className="text-red-300 text-sm">{errors.content.message}</p>}
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                        <label className="mb-2 font-medium text-gray-700 block">Thumbnail Image URL</label>
                        <input
                            {...register("thumbnail")}
                            className={`w-full px-4 py-2 border ${errors.thumbnail ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                            placeholder="Enter thumbnail image URL"
                        />
                        {errors.thumbnail && <p className="text-red-300 text-sm">{errors.thumbnail.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#019fc7] text-white font-medium py-2 rounded-lg hover:bg-[#019fc7] focus:outline-none cursor-pointer">Add Blog Post</Button>
                </form>
            </div>
        </div>
    );
};

export default ManageBlogCreate;
