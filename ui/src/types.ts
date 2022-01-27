// @flow
export type Id = string;

export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};

export type Item = {
  id: Id;
  content: string;
  authorId: string;
  columnId: string;
};

export type ItemMap = {
  [key: string]: Item[];
};

export type Task = {
  id: Id;
  content: string;
};

export type WrapperType = {
  isDraggingOver: boolean;
  isDropDisabled: boolean;
  isDraggingFrom: boolean;
};
