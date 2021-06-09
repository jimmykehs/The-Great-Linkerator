const apiRouter = require("express").Router();

const { getAllLinkTagsWithTags } = require("../db");

apiRouter.get("/links", async (req, res, next) => {
  try {
    res.send(await getAllLinkTagsWithTags());
  } catch (error) {}
});

apiRouter.get("/tags", async (req, res, next) => {
  try {
  } catch (error) {}
});

apiRouter.get("/:tagName/links", async (req, res, next) => {
  try {
  } catch (error) {}
});

apiRouter.post("/links", async (req, res, next) => {
  try {
  } catch (error) {}
});

apiRouter.patch("/links/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = apiRouter;
