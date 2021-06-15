const apiRouter = require("express").Router();

const {
  //client,
  createLink,
  //createTags,
  getAllLinks,
  getAllTags,
  getAllLinkTags,
  createLinkTag,
  updateClickCount,
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
    const tags = await attachTagsToLink()
    console.log(tags)
    res.send({ 
      tags
    })

  } catch ({name, messages}) {
      next({name, messages})
  }
})


//CreateLinkTag         ***NEEDS WORK 500 ERROR***
apiRouter.post("/links/post", async (req, res, next) => {
  const { name, url, comment, tags } = req.body
  const tagArr = tags.trim().split(/\s+/)
  const linkData = {}

  if (tagArr.length) {
    linkData.link_tags = tagArr
  }

  try {
    linkData.link_name = name ,
    linkData.link_url = url,
    linkData.link_comment = comment,
    linkData.link_tags = tags
    
    const newLink = await createLink(linkData)

    if (newLink) {
      res.send({ linkData })
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
  console.log("In the correct route")
  const { id } = req.params
  const { count } = req.body

  try {
    const updatedLink = await updateClickCount(id, count)
    console.log(updatedLink, "Here lies the updated link")
    if (updatedLink) {
      res.send({ link: updatedLink })
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