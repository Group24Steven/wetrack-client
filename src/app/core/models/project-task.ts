import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from "../enums/project-status";

export class ProjectTask {
    constructor(
        id: number,
        name: string,
        projectId: string,
        priority: ProjectPriority,
        projectNumber: string,
        createdDate: number,
        status: ProjectStatus,
        lastModifiedDate: number,
        startDate: number,
    ) { }
}
