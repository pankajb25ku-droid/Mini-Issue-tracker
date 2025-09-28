export type IssueStatus = 'open' | 'in-progress' | 'done';

export interface Issue {
  id: number;
  title: string;
  description?: string;
  status: IssueStatus;
}



// export enum IssueStatus {
//   TODO = 'To Do',
//   IN_PROGRESS = 'In Progress',
//   DONE = 'Done',
// }

// export interface Issue {
//   id: string;
//   title: string;
//     description?: string;
//   status: IssueStatus;
//   createdAt: number;
// }