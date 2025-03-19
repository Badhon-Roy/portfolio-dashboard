"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createBlog = async (data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        revalidateTag("BLOG")
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const getAllBlogs = async () => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`,{
            next: {
                tags: ["BLOG"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}
export const getSingleBlog = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
            next: {
                tags: ["BLOG"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const updateBlog = async (id: string, data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        revalidateTag("BLOG");
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}