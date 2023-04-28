import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from '../enums/project-status';

export class Task {
    constructor(
        id: number,
        subject: string,
        priority: ProjectPriority,
        status: ProjectStatus,
        lastModifiedDate: number,
    ) { }
}
