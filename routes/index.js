const apiRouter = require("express").Router();

const {
  //client,
  createLink,
  //createTags,
  getAllLinks,
  getAllTags,
  getAllLinkTags,
  createLinkTag,
  //updateClickCount,
  getAllLinksWithTags,
  attachTagsToLink
} = require ('../db')


//getAllLinks
apiRouter.get("/links", async (req, res, next) => {
  try {
    const links = await getAllLinksWithTags()

    res.send({
      links
    })

  } catch ({name, messages}) {
      next({name, messages})
  }
})


//getAllTags
apiRouter.get("/tags", async (req, res, next) => {
  try {
    const tags = await getAllTags()
    console.log(tags)
    res.send({ 
      tags
    })

  } catch ({name, messages}) {
      next({name, messages})
  }
})



// //getAllLinkTagsWithTags
// apiRouter.get("/links/:tagName", async (req, res, next) => {
//   const { tagName } = req.params
//   try {
//     const linkTags = await getAllLinksWithTags(tagName)
//   } catch (error) {
    
//   }
// })



//CreateLinkTag ***NEEDS WORK 500 ERROR***
apiRouter.post("/links", async (req, res, next) => {
  const { url, comment, count, tags = [] } = req.body
  const tagArr = tags.trim().split(/\s+/)
  const linkData = {}

  if (tagArr.length) {
    linkData.tags = tagArr
  }

  try {
    linkData.link_url = { url },
    linkData.link_comment = { comment },
    linkData.link_view_count = { count },
    linkData.link_tags = { tags }
    
    const newLink = await createLinkTag(linkData)

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
