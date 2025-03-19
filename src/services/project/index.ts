"use server"

import { FieldValues } from "react-hook-form";

export const createProject = async (data: FieldValues) => {
    try {
        const result = await fetch('http://localhost:5000/api/v1/projects', {
            method: "POST",
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

export const getAllProjects = async () => {
    try {
        const result = await fetch('http://localhost:5000/api/v1/projects', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}
export const getSingleProject = async (id: string) => {
    try {
        const result = await fetch(`http://localhost:5000/api/v1/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return result.json();
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const updateProject = async (id: string, data: FieldValues) => {
    try {
        const result = await fetch(`http://localhost:5000/api/v1/projects/${id}`, {
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