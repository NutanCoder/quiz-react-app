export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IProfile extends UpdateProfilePayload {
  uuid: string;
  role: string;
  xp: string;
  created_at: string;
  updated_at: string;
} 