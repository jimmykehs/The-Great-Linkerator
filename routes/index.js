const apiRouter = require("express").Router();

const {
  //client,
  createLink,
  //createTags,
  getAllLinks,
  getAllLinkTags,
  createLinkTag,
  //updateClickCount,
  getAllLinkTagsWithTags,
} = require ('../db')


//getAllLinks
apiRouter.get("/links", async (req, res, next) => {
  try {
    const links = await getAllLinks()

    res.send({
      links
    })

  } catch ({name, messages}) {
      next({name, messages})
  }
})


//getAllLinkTags
apiRouter.get("/tags", async (req, res, next) => {
  try {
    const tags = getAllLinkTags()

    res.send({ 
      tags
    })

  } catch ({name, messages}) {
      next({name, messages})
  }
})



//getAllLinkTagsWithTags
apiRouter.get("/:tagName/links", async (req, res, next) => {
  const { tagName } = req.params
  try {
    const links = await getAllLinkTagsWithTags(tagName)
  } catch (error) {
    
  }
})



//CreateLinkTag
apiRouter.post("/links", async (req, res, next) => {
  const { url, comment, tags = [] } = req.body
  const tagArr = tags.trim().split(/\s+/)
  const linkData = {}

  if (tagArr.length) {
    linkData.tags = tagArr
  }

  try {
    linkData.url = url,
    linkData.comment = comment
    linkData.count = count,
    linkData.tags = tags
    
    const newLink = await createLinkTags(linkData)

    if (newLink) {
      res.send({ newLink })
    } else {
      next({
        name: 'Create Link Error',
        message: 'Link create Error'
      })
    }
  } catch ({name, message}) {
      next({name, message})
  }
})



apiRouter.patch("/links/:id", async (req, res, next) => {
  const { id } = req.params
  const { url, count, comment } = req.body
  const updateFields = {}

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/)
  }

  if (url) {
    updateFields.url = url
  }

  if (count) {
    updateFields.count = count
  }

  if (comment) {
    updateFields.comment = comment
  }

  try {
    const updatedLink = await updateLink(id, updateFields)
    if (updatedLink) {
      res.send({link: updatedLink})
    } else {
      next({
        name: 'Link update Fail',
        message: 'Error updating Link'
      })
    }

  } catch ({name, messages}) {
      next({name, messages})
  }

})


apiRouter.patch("/tags", async (req, res, next) => {
  try {
    
  } catch ({name, messages}) {
      next({next, messages})
  }
})

module.exports = apiRouter;
