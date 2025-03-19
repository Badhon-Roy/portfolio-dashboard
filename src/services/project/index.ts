"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createProject = async (data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        revalidateTag("PROJECT")
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const getAllProjects = async () => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`,{
            next: {
                tags: ["PROJECT"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}
export const getSingleProject = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            next: {
                tags: ["PROJECT"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const updateProject = async (id: string, data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
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

export const deleteProject = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        revalidateTag("PROJECT");
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}