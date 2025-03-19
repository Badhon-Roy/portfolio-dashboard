import UpdateBlogForm from "@/components/modules/blogs/UpdateBlogForm";
import { getSingleBlog } from "@/services/blog";

const UpdateBlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: blog } = await getSingleBlog(id)
    return (
        <div>
            <UpdateBlogForm blog={blog}/>
        </div>
    );
};

export default UpdateBlogPage;