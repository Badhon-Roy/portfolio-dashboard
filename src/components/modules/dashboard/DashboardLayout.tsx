"use client"
import React, { useState } from "react";
import { Menu, FolderPlus, FolderOpen, BookPlus, BookOpen, Wrench, Settings, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ManageDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Function href check if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white w-64 p-5 space-y-6 absolute inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                {/* Logo & Title */}
                <div className="flex items-center space-x-2">
                    <LayoutDashboard size={24} />
                    <h2 className="text-xl font-bold">Dashboard</h2>
                </div>

                {/* Navigation */}
                <nav className="mt-6">
                    <ul className="space-y-4">
                        {/* Project Section */}
                        <li>
                            <h3 className="text-gray-400 text-sm">Project Management</h3>
                            <Link
                                href="/dashboard/projects/create"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/projects/create") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <FolderPlus size={18} />
                                <span>Project Create</span>
                            </Link>
                            <Link
                                href="/dashboard/projects/manage"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/projects/manage") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <FolderOpen size={18} />
                                <span>Project Manage</span>
                            </Link>
                        </li>

                        {/* Blog Section */}
                        <li>
                            <h3 className="text-gray-400 text-sm">Blog Management</h3>
                            <Link
                                href="/dashboard/blogs/create"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/blogs/create") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <BookPlus size={18} />
                                <span>Blog Create</span>
                            </Link>
                            <Link
                                href="/dashboard/blogs/manage"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/blogs/manage") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <BookOpen size={18} />
                                <span>Blog Manage</span>
                            </Link>
                        </li>

                        {/* Skill Section */}
                        <li>
                            <h3 className="text-gray-400 text-sm">Skill Management</h3>
                            <Link
                                href="/dashboard/skills/create"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/skills/create") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <Wrench size={18} />
                                <span>Skill Create</span>
                            </Link>
                            <Link
                                href="/dashboard/skills/manage"
                                className={`flex items-center space-x-2 p-2 rounded-md ${isActive("/dashboard/skills/manage") ? "bg-primary" : "hover:bg-gray-700"
                                    }`}
                            >
                                <Settings size={18} />
                                <span>Skill Manage</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                    <Button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <Menu size={24} />
                    </Button>
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>

                {/* Page Content */}
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default ManageDashboardLayout;
