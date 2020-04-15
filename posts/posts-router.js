const express = require("express")
const posts = require("../data/db")

const router = express.Router()

router.post("/api/posts", (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts.insert(req.body)
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
    const { text } = req.body;
    const { id: post_id } = req.params;
        if (!req.body.text) {
              return res.status(400).json({ message: "Please include text for your comment." })
        }
        posts.insertComment({ text, post_id })
        .then(comment => {
          console.log("comment", comment);
          if (!comment.id) {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          } else {
            res.status(201).json(comment);
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: "There was an error while saving the comment to the database"
          });
        });
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

router.get("/api/posts/:id/comments", (req, res) => {
    posts.findById(req.params.id)
     .then((post) => {
      if (!post) {
       res.status(404).json({
        message: "The post with the specified ID does not exist."
       });
      } else {
        posts.findPostComments(req.params.id)
        .then(data => {
            console.log("something",data);
            res.status(200).json(data);
           })
           .catch(err => {
            console.log(err);
           });
      }
     })
     .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "The comments information could not be retrieved" });
       });    
   });

   router.delete("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
     .then(post => {
      if (post) {
       res.status(200);
      } else {
       res.status(404).json({ message: "No post was found with specified ID." });
      }
     })
     .catch((err) => {
      console.log(err);
      res.status(500).json({
       message: "There was an error deleting the post from the database."
      });
     });
    posts.remove(req.params.id)
     .then((post) => {
      res.status(200).json(post);
     })
     .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete the post by that ID." });
     });
   });

router.put("/api/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
     res.status(400).json({
      message: "Please include both a title and contents for updating this post."
     });
    }
     posts.findById(req.params.id)
     .then((post) => {
      if (!post) {
       res.status(404).json({ message: "Post with that id was not found." });
      } else {
       posts.update(req.params.id, req.body)
        .then((posts) => {
         res.status(200).json(posts);
        })
        .catch(err =>
         res.status(500).json(err)
        );
      }
     })
     .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error updating the post." });
     });
   });



module.exports = router