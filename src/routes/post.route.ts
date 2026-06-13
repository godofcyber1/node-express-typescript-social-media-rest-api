import express from 'express';

import {
  createPostController,
  getPostsController,
  getPostController,
  getDraftPostController,
  updateDraftPostController,
  deletePostController,
  editPostController,
} from '@src/controllers';
import { isAdmin, isAuth, postsPaginationMiddleware, uploadImage } from '@src/middlewares';

const router = express.Router();

router.get('/', postsPaginationMiddleware(), getPostsController);
router.get('/users/:userId/drafts/:postId', isAuth, getDraftPostController);
router.patch('/users/:userId/drafts/:postId', isAuth, updateDraftPostController);
router.get('/:postId', getPostController);
router.post('/', isAuth, isAdmin, uploadImage.single('postImage'), createPostController);
router.delete('/:postId', isAuth, isAdmin, deletePostController);
router.patch('/:postId', isAuth, isAdmin, uploadImage.single('postImage'), editPostController);

export = router;
