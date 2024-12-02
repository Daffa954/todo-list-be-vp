export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: string;
  due_date: string;
  status: string; //foreign key
  user_id: number;
}
