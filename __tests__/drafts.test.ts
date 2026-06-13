import mongoose from 'mongoose';
import request from 'supertest';

const mockUserId = new mongoose.Types.ObjectId().toString();
const mockPostId = new mongoose.Types.ObjectId().toString();

jest.mock('dotenv-safe', () => ({
  config: jest.fn(),
}));

jest.mock('@src/middlewares', () => {
  const actual = jest.requireActual('@src/middlewares');

  return {
    ...actual,
    isAuth: (req: any, _res: any, next: any) => {
      req.user = { _id: mockUserId };
      next();
    },
  };
});

jest.mock('@src/models/Post.model', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

import app from '@src/app';
import Post from '@src/models/Post.model';

describe('GET /api/v1/posts/users/:userId/drafts/:postId', () => {
  it('returns a private draft for the owner', async () => {
    const draft = {
      _id: mockPostId,
      title: 'Draft title',
      content: 'Draft content',
      postImage: '/static/uploads/posts/draft.png',
      author: mockUserId,
      visibility: 'private',
    };

    (Post.findOne as jest.Mock).mockResolvedValue(draft);

    await request(app)
      .get(`/api/v1/posts/users/${mockUserId}/drafts/${mockPostId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(Post.findOne).toHaveBeenCalledWith({
          _id: mockPostId,
          author: mockUserId,
          visibility: 'private',
        });
        expect(response.body.data.post).toEqual(draft);
      });
  });
});
