const express = require("express")
const posts = require("../data/db")

const router = express.Router()

router.post("/api/posts", (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts.add(req.body)
        .then((post) => {
                res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

router.post("/api/posts/:id/comments", (req,res) => {
        if (!text) {
         res.status(400).json({ message: "Please include text for your comment" });
        } else {
         posts.findById(id)
          .then((posts) => {
           if (posts) {
            res.status(404).json({ message: "There is no post by that ID." });
           }
           return posts.insertComment({ text, post_id: id });
          })
          .then(data => {
           posts.findCommentById(data.id)
            .then(comment => {
             res.status(201).json(comment);
            })
            .catch(err => {
             console.log(err);
             res
              .status(500)
              .json({ message: "Error retrieving comment that was created." });
            });
          })
          .catch(err => {
           console.log(err);
           res.status(500).json({ message: "Error saving comment to the database" });
          });
        }
       });

router.get("/api/posts", (req,res) => {
    posts.find()
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

router.get("/api/posts/:id", (req,res)  => {
    posts.findById(req.params.id)
    .then ((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The psot with the specified ID does not exist."
            })
        }
    })
})

router.get("/api/posts:id/comments", (req, res) => {
    posts.findById(req.params.id)
     .then((post) => {
      if (post) {
       res.status(404).json({
        message: "There is no post by that ID."
       });
      } else {
       return post.findPostComments(req.params.id);
      }
     })
     .then(data => {
      console.log(data);
      res.status(200).json(data);
     })
     .catch(err => {
      console.log(err);
     });
   });

   router.delete("/:id", (req, res) => {
    posts.findById(req.params.id)
     .then(post => {
      if (post) {
       res.status(200);
      } else {
       res.status(404).json({ message: "No post was found with specified ID." });
      }
     })
     .catch(err => {
      console.log(err);
      res.status(500).json({
       message: "There was an error deleting the post from the database."
      });
     });
    db
     .remove(req.params.id)
     .then((post) => {
      res.status(200).json(post);
     })
     .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete the post by that ID." });
     });
   });

router.put("/api/posts:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
     res.status(400).json({
      message: "Please include both a title and contents for updating this post."
     });
    }
    db
     .findById(req.params.id)
     .then((post) => {
      if (post) {
       res.status(404).json({ message: "Post with that id was not found." });
      } else {
       post.update(req.params.id, req.body)
        .then((posts) => {
         res.status(200).json(posts);
        })
        .catch(err =>
         res.status(500).json({ message: "There was an error updating the post." })
        );
      }
     })
     .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error updating the post." });
     });
   });



module.exports = router