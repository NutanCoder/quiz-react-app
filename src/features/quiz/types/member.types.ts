import { IProfile } from "@/features/profile";

export interface IMember {
  uuid: string;
  student_id: string;
  quiz_id: string;
  created_by: string;
  created_at: Date;
  student: IProfile;
}
