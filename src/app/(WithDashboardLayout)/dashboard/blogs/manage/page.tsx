import ManageAllBlogs from "@/components/modules/blogs/ManageAllBlogs";
import { getAllBlogs } from "@/services/blog";

const BlogManagePage = async() => {
    const { data: blogs } = await getAllBlogs();
    return (
        <div>
            <ManageAllBlogs blogs={blogs}/>
        </div>
    );
};

export default BlogManagePage;