import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from '../enums/project-status';

export class Task {
    constructor(
        public id: string,
        public subject: string,
        public priority: ProjectPriority,
        public status: ProjectStatus,
        public lastModifiedDate: number,
        public customerId?: string
    ) { }
}
