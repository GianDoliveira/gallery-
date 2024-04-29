export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
  id: any
};

export type PhotoProfile = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
}