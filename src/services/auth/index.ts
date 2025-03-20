"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
    try {
        const res = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await res.json()
        if (result.success) {
            (await cookies()).set('accessToken', result?.data?.accessToken)
        }
        return result;
    } catch (error: any) {
        return new Error(error?.message)
    }
}

export const getCurrentUser = async () => {
    const accessToke = (await cookies()).get('accessToken')?.value
    let decodedData = null;
    if (accessToke) {
        decodedData = await jwtDecode(accessToke)
    }
    return decodedData;
}