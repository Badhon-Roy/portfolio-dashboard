import { getSingleProject } from "@/services/project";
import Image from "next/image";
import Link from "next/link";

const ProjectDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: project } = await getSingleProject(id);
    const { name, description, images, technologiesUsed, keyFeatures, liveSite, clientSiteGitHub, serverSiteGitHub } = project;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8 border-2 border-white">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Project Details</h2>

            {/* Project Name */}
            <h3 className="text-2xl font-bold text-gray-700 mb-4">{name}</h3>

            {/* Project Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {images?.map((image: string, index: number) => (
                    <div key={index} className="relative w-full h-60">
                        <Image
                            className="object-cover rounded-lg border border-gray-400 p-2"
                            src={image}
                            alt={`${name} image ${index + 1}`}
                            layout="fill"
                        />
                    </div>
                ))}
            </div>

            {/* Project Description */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* Project Technologies */}
            <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Technologies Used</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <h5 className="font-semibold text-gray-700">Frontend</h5>
                        <ul className="list-disc pl-5 text-gray-600">
                            {technologiesUsed?.frontend.map((tech: string, index: number) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-700">Backend</h5>
                        <ul className="list-disc pl-5 text-gray-600">
                            {technologiesUsed?.backend.map((tech: string, index: number) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-700">Database</h5>
                        <p className="text-gray-600">{technologiesUsed?.database}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-700">Authentication</h5>
                        <p className="text-gray-600">{technologiesUsed?.authentication}</p>
                    </div>
                </div>
            </div>



            <div className="flex justify-between items-start gap-8">
                {/* Live Site & GitHub Links */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Links</h4>
                    <div className="space-y-3 flex flex-col">
                        <Link href={liveSite} target="_blank" className="text-blue-600 hover:underline">
                            Live Site
                        </Link>
                        <Link href={clientSiteGitHub} target="_blank" className="text-blue-600 hover:underline">
                            Client Site GitHub
                        </Link>
                        <Link href={serverSiteGitHub} target="_blank" className="text-blue-600 hover:underline">
                            Server Site GitHub
                        </Link>
                    </div>
                </div>
                {/* Key Features */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 text-gray-600">
                        {keyFeatures?.map((feature: string, index: number) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
