import { getSingleBlog } from "@/services/blog";
import Image from "next/image";

const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: blog } = await getSingleBlog(id)
    const { title, tags, category, content, thumbnail } = blog;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* Blog Thumbnail */}
            <div className="mb-6">
                <Image
                    src={thumbnail}
                    alt={title}
                    className="w-full h-60 object-cover rounded-lg"
                    width={600}
                    height={240}
                />
            </div>

            {/* Blog Title */}
            <h1 className="text-3xl font-bold text-center text-[#019fc7] mb-4">{title}</h1>

            {/* Category */}
            <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Category:</span> {category}
            </div>

            {/* Tags */}
            <div className="mb-6">
                <span className="font-medium text-lg">Tags: </span>
                <ul className="flex space-x-3">
                    {tags.map((tag: string, index: number) => (
                        <li
                            key={index}
                            className="text-[#019fc7] border border-[#019fc7] rounded-full px-4 py-1 text-sm font-medium hover:bg-[#019fc7] hover:text-white transition"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="text-lg text-gray-700">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default BlogDetailsPage;