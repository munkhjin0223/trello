// @flow
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import {
  borderRadius,
  grid,
  imageSize,
  scrollContainerHeight
} from './constants';
import { WrapperType } from './types';
import {
  getBorderColor,
  getItemBackgroundColor,
  getListBackgroundColor
} from './utils';

export const Title = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;

export const Wrapper = styled.div`
  background-color: ${(props: WrapperType) =>
    getListBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }: WrapperType) =>
    isDropDisabled ? 0.5 : 'inherit'};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

export const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

export const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

export const ListContainer = styled.div``;

export const CloneBadge = styled.div`
  background: ${colors.G100};
  bottom: ${grid / 2}px;
  border: 2px solid ${colors.G200};
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);

  height: ${imageSize}px;
  width: ${imageSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemContainer = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props: any) =>
    getBorderColor(props.isDragging, props.colors)};
  background-color: ${(props: any) =>
    getItemBackgroundColor(
      props.isDragging,
      props.isGroupedOver,
      props.colors
    )};
  box-shadow: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props: any) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

export const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

export const BlockItem = styled.div`
  &::before {
    content: open-item;
  }

  &::after {
    content: close-item;
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

type AuthorType = {
  colors: any;
};

export const Author = styled.small`
  color: ${(props: AuthorType) => props.colors.hard};
  flex-grow: 0;
  margin: 0;
  background-color: ${(props: AuthorType) => props.colors.soft};
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

export const ItemId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

export const AddNew = styled.button`
  width: 100%;
  margin-top: 5px;
  padding: 5px 0;

  &:hover {
    cursor: pointer;
  }
`;
