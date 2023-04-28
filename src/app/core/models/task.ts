import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from '../enums/project-status';

export class Task {
    constructor(
        id: number,
        lastModified: number,
        subject: string,
        priority: ProjectPriority,
        status: ProjectStatus
    ) { }
}
