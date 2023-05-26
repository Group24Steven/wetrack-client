import { Task } from "./task";

export class ProjectOrder {
  id: string
  orderNumber: string
  commission: string
  orderItems: OrderItem[] 
}

export class OrderItem {
  id: string
  title?: string
  articleNumber?: string
  description?: string
  tasks: Task[]
  serviceItem: boolean
}

