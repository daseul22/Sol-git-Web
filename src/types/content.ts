export enum MessageMethodTypes {
  GET_CONTENT_CARD_URL = 'GET_CONTENT_CARD_URL',
  POST_CONTENT_CARD_URL = 'POST_CONTENT_CARD_URL',
  GET_FOLDERS = 'GET_FOLDERS',
  POST_CONTENT_FEEDBACK = 'POST_FEEDBACK',
  POST_CONTENT_SAVE = 'POST_CONTENT_SAVE'
}

export type ContentFeedback = {
  clipId: number;
  isUseful: boolean;
  isSave: boolean;
  folderId: number;
}

export type CreateClipPayload = {
  folderId: number;
  isPrivate: boolean;
  url: string;
  memo: string;
}

export type Content = {
  id: number;
  url: string;
  memo: string;
  isUseful: boolean;
  isSave: boolean;
}

export type UpdateClipPayload = {
  clipId: number;
  isUseful: boolean;
  isSave: boolean;
  folderId: boolean;
}

export enum ActionType {
  SAVE = 'save',
  READ = 'read',
  USEFUL ='useful'
}
