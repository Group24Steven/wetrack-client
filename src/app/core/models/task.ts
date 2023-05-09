import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from '../enums/project-status';

export class Task {
    constructor(
        public id: number,
        public subject: string,
        public priority: ProjectPriority,
        public status: ProjectStatus,
        public lastModifiedDate: number,
    ) { }
}
