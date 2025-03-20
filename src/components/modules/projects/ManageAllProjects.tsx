"use client";

import { IProject } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProject } from "@/services/project";

const ManageAllProjects = ({ projects }: { projects: IProject[] }) => {
    const [isDeleteId, setIsDeleteId] = useState<string | null>(null);

    const handleDelete = async () => {
        const toastLoading = toast.loading("Deleting...");
        try {
            const res = await deleteProject(isDeleteId as string);
            if (res.success) {
                toast.success(res?.message, { id: toastLoading });
            } else {
                toast.error(res?.message, { id: toastLoading });
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", { id: toastLoading });
        }
    };

    return (
        <div className="p-6 shadow-lg rounded-lg mt-8 border-2 border-white">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Projects</h2>
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="px-4 py-2 text-left md:text-xl font-bold text-gray-600">Name</TableHead>
                            <TableHead className="px-4 py-2 text-left md:text-xl font-bold text-gray-600">Project Type</TableHead>
                            <TableHead className="px-4 py-2 text-left md:text-xl font-bold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.map((project) => (
                            <TableRow
                                key={project?._id}
                                className="border-t border-b border-gray-200 hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 flex items-center gap-3 mr-20">
                                    <Image
                                        className="rounded-lg border-2 border-white shadow-md object-contain"
                                        src={project?.images[0]}
                                        alt="project image"
                                        width={80}
                                        height={50}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{project?.name}</span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-sm text-gray-500">{project?.projectType}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="flex gap-4 items-center">
                                        <Link href={`/dashboard/projects/manage/${project?._id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-blue-600 hover:bg-blue-50"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Link href={`/dashboard/projects/update/${project?._id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-yellow-500 hover:bg-yellow-50"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    onClick={() => setIsDeleteId(project?._id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] bg-white">
                                                <DialogHeader>
                                                    <DialogTitle className="text-center text-xl font-bold">Are you sure</DialogTitle>
                                                    <DialogDescription className="text-center">
                                                        went to delete "{project?.name}" this project
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex justify-between items-center gap-8">
                                                    <DialogClose asChild>
                                                        <Button type="submit" className="bg-[#019fc7] text-white font-medium py-2 rounded-lg hover:bg-[#019fc7] focus:outline-none cursor-pointer">No</Button>
                                                    </DialogClose>
                                                    <Button type="submit" onClick={handleDelete} className="bg-[#c70101] text-white font-medium py-2 rounded-lg focus:outline-none cursor-pointer">Yes</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageAllProjects;
