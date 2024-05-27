export type UserProfile = {
  user_id: number;
  photo_url?: string;
  birth_date?: Date;
  whatsapp_number?: string;
  address?: string;
  occupation?: string;
};

export type User = {
  email: string;
  id?: number;
  is_verified: boolean;
  name?: string;
};
