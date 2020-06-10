const express = require("express");
const posts = require("./data/db");

const router = express.Router();

// POST request - adding a new post 
router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post." })
    }
    else {
        posts.insert(req.body)
            .then(post => res.status(201).json(post))
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "There was an error while saving the post to the database." })
            })
    }
})

// POST request - adding comments
router.post("/:id/comments", (req, res) => {
    const comment = { ...req.body, post_id: params.id }

    if (!req.params.id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if (!req.params.text) {
        res.status(400).json({ message: "Please provide text for the comment." })
    }
    else {
        posts.insertComment(comment)
            .then(comment => res.status(201).json(comment))
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "There was an error while saving the comment to the database." })
            })
    }
})

// GET request - getting posts
router.get("/", (req, res) => {
    posts.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The posts information could not be retrieved." })
        })

})

// GET request - getting posts by ID
router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
        .then(posts => {res.status(200).json(posts)})
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

// GET request - getting comments for a specific post
router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
        .then(comments => res.status(200).json(comments))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The comments information could not be retrieved." })
        })
})

// DELETE request - deleteing a post
router.delete("/:id", (req, res) => {
    posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: "The message has been deleted.",
                });
            } else {
                res.status(404).json({
                    message: "The post with specified ID doesn't exist.",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "The post could not be removed.",
            });
        });
})

// PUT request - updating a post
router.put("/:id", (req, res) => {
    posts.update(req.params.id, req.params.body)
        .then(post => {
            if (post) {
                res.status(200).json(posts)
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "The post information could not be modified." });
        });
})

module.exports = router;