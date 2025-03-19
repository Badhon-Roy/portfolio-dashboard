export interface IProject {
    _id:string
    name: string
    images: string[]
    description: string
    technologiesUsed: TechnologiesUsed
    teamMembers: string
    projectType: 'personal' | 'team'
    liveSite: string
    clientSiteGitHub: string
    serverSiteGitHub: string
    keyFeatures: string[]
}

export interface TechnologiesUsed {
    frontend: string[]
    backend: string[]
    database: string
    authentication: string
}