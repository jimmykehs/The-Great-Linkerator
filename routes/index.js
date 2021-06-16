const apiRouter = require("express").Router();

const {
  createLink,
  //createTags,
  getAllLinks,
  getAllTags,
  getAllLinkTags,
  createLinkTag,
  updateClickCount,
  getAllLinksWithTags,
  getTagByContent,
  // attachTagsToLink
} = require("../db");


//getAllLinks
apiRouter.get("/links", async (req, res, next) => {
  try {
    const links = await getAllLinksWithTags();

    res.send({
      links,
    });
  } catch ({ name, messages }) {
    next({ name, messages });
  }
});


//getAllTags
apiRouter.get("/tags", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({
      tags,
    });
  } catch ({ name, messages }) {
    next({ name, messages });
  }
});


//CreateLinkTag         ***NEEDS WORK 500 ERROR***
apiRouter.post("/links/post", async (req, res, next) => {
  const { name, url, comment, tags = "" } = req.body;
  const tagsArr = tags.trim().split(",");

  try {
    const linkData = {
      link_name: name,
      link_url: url,
      link_comment: comment,
    };

    const newLink = await createLink(linkData);

    //Grabs id of Link
    const linkId = newLink.id;
    
    if (tagsArr.length > 0) {
      tagsArr.map(async (tag) => {
       
        const existingTag = await getTagByContent(tag);
        console.log(existingTag)
        if (existingTag !== undefined) {
          console.log("It exists! Here is the ID: ", existingTag.id);
          // createLinkTag(linkId, tagId)
        } else {
          const newTag = createTag(tag);
          console.log("Tag was created! Here is the ID for it!:", newTag.id);
          // createLinkTag(linkId, tagId)
        }
      });
    }

    if (newLink) {
      res.send({ linkData });
    } else {
      next({
        name: "Create Link Error",
        message: "Link create Error",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


apiRouter.patch("/links/:id", async (req, res, next) => {
  console.log("In the correct route");
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedLink = await updateClickCount(id, count);
    console.log(updatedLink, "Here lies the updated link");
    if (updatedLink) {
      res.send({ link: updatedLink });
    } else {
      next({
        name: "Link update Fail",
        message: "Error updating Link",
      });
    }
  } catch ({ name, messages }) {
    next({ name, messages });
  }
});


apiRouter.patch("/tags", async (req, res, next) => {
  try {
  } catch ({ name, messages }) {
    next({ next, messages });
  }
});

module.exports = apiRouter;

// apiRouter.patch("/links/count", async (req, res, next) => {
//   try {

//   } catch ({name, messages}) {
//       next({next, messages})
//   }
// })

// //getAllLinkTagsWithTags
// apiRouter.get("/links/:tagName", async (req, res, next) => {
//   const { tagName } = req.params
//   try {
//     const linkTags = await getAllLinksWithTags(tagName)
//   } catch (error) {

//   }
// })
