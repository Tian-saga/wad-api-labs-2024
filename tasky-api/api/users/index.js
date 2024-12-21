import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line



// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {
      // 不用手动 try...catch，若出错直接扔给 asyncHandler
      const user = await User(req.body).save();
      return res.status(201).json({
        code: 201,
        msg: 'Successfully created a new user.',
        user: {
          id: user._id,
          username: user.username
        }
      });
    } else {
      // 登录逻辑
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ code: 401, msg: 'Authentication failed' });
      }
      return res.status(200).json({ 
        code: 200,
        msg: 'Authentication successful',
        token: 'TEMPORARY_TOKEN'
      });
    }
  }));
  


// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

export default router;
