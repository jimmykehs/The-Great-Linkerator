const apiRouter = require("express").Router();

const {
  createLink,
  createTags,
  getAllLinks,
  getAllTags,
  getAllLinkTags,
  createLinkTag,
  updateClickCount,
  getAllLinksWithTags,
  getTagByContent,
  deleteLink
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

//CreateLinkTag       
apiRouter.post("/links/post", async (req, res, next) => {
  const { name, url, comment, tags = "" } = req.body;
  const tagsArr = tags.trim().split(", ");

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
        if (existingTag === undefined) {
          const newTag = await createTags(tag);
          createLinkTag(linkId, newTag.id);
        } else {
          createLinkTag(linkId, existingTag.id);
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
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedLink = await updateClickCount(id, count);
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



apiRouter.delete("/links/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedLink = await deleteLink(id)
    res.send({
      message: deletedLink
    })
  } catch ({name, messages}) {
      next({name, messages})
  }
})

module.exports = apiRouter;



