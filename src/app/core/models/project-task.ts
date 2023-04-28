import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from "../enums/project-status";

export class ProjectTask {
    constructor(
        id: number,
        name: string,
        projectId: string,
        priority: ProjectPriority,
        projectNumber: string,
        status: ProjectStatus,
        createdDate: number,
        lastModifiedDate: number,
        startDate: number,
    ) { }
}
