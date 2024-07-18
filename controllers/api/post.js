const router = require('express').Router();
const { Post } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(201).json(newPost); // 201 Created status for successful creation
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'No post found with this id or unauthorized to update!' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id or unauthorized to delete!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
