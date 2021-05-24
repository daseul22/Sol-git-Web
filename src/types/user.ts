import { Dispatch, SetStateAction } from 'react'

export type OnboardingInfo = {
  googleIdToken: string;
  originJob: string;
  interestJob: string;
  tags: number[];
  work?: string;
  company?: string;
}

export type Follow = {
  id: number;
  follower: number;
  userId: number;
  user: User;
}

export type Tag = {
  id: number;
  tag: string;
  kind: string;
  users: UserOnTag[]
}

export type UserOnTag = {
  id: number;
  tagId: number;
  Tag: Tag;
  userId: number;
  User: User;
}

export type FolderOnClip = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  clipId: number;
  Clip: Clip;
  folderId: number;
  Folder: Folder;
}

export type Folder = {
  id: number;
  folderName: string;
  userId: number;
}

export type Clip = {
  id: number;
  title: string;
  content: string;
  url: string;
  memo: string;
  private: boolean;
  usefulCount: number;
  createAt: Date;
  users: UserOnClip[];
  folders: FolderOnClip[];
}

export type UserOnClip = {
  id: number;
  clipId: number;
  Clip: Clip;
  User: User;
  userId: number;
}

export type User = {
  id: number;
  name: string;
  email: string;
  profileUrl: string;
  introduce: string;
  originJob: string;
  work?: string;
  company?: string;
  interestJob: string;
  // follows: Follow[];
  tags: Tag[];
  // folders: Folder[];
  // clips: UserOnClip[];
}

export type OnboardingStepProps = {
  toNextStep: Dispatch<SetStateAction<void>>;
  setOnboardingInfo: (info: Record<string, string | number[]>) => void;
}
