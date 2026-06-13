import { Request, Response, NextFunction } from 'express';

import {
  createPostService,
  editPostService,
  deletePostService,
  getDraftPostService,
  getPostService,
  getPostsService,
  updateDraftPostService,
} from '@src/services';
import { TPaginationResponse, Post as TPost, AuthenticatedRequestBody } from '@src/interfaces';

export const getPostsController = (req: Request, res: TPaginationResponse) => getPostsService(req, res);
export const getPostController = (req: Request, res: Response, next: NextFunction) => getPostService(req, res, next);
export const getDraftPostController = (req: AuthenticatedRequestBody<TPost>, res: Response, next: NextFunction) =>
  getDraftPostService(req, res, next);
export const updateDraftPostController = (req: AuthenticatedRequestBody<TPost>, res: Response, next: NextFunction) =>
  updateDraftPostService(req, res, next);
export const createPostController = (req: AuthenticatedRequestBody<TPost>, res: Response, next: NextFunction) =>
  createPostService(req, res, next);
export const deletePostController = (req: Request, res: Response, next: NextFunction) =>
  deletePostService(req, res, next);
export const editPostController = (req: AuthenticatedRequestBody<TPost>, res: Response, next: NextFunction) =>
  editPostService(req, res, next);

export default {
  getPostsController,
  createPostController,
  getPostController,
  getDraftPostController,
  updateDraftPostController,
  deletePostController,
  editPostController,
};
