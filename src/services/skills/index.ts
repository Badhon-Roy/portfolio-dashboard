"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSkill = async (data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        revalidateTag("SKILL")
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const getAllSkills = async () => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`,{
            next: {
                tags: ["SKILL"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}
export const getSingleSkill = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
            next: {
                tags: ["SKILL"]
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const updateSkill = async (id: string, data: FieldValues) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
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

export const deleteSkill = async (id: string) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        revalidateTag("SKILL");
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}