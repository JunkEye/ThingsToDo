const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const db = require("../db/models");
const { requireAuth } = require("../utils/auth");

// CRUD - create, read, update, delete a tag is needed. Only the admin should be able to do this

router.post(
  "/",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    const { name } = req.body;

    if (name) {
      const thingTag = await db.ThingsToDoListTag.create({
        name,
      });
      if (thingTag) {
        res.json(thingTag);
      } else {
        throw new Error(
          "Something went wrong when making the ThingToDoTag. Check the name and try again"
        );
      }
    } else {
      throw new Error(
        "Error finding the Name parameter. Check the request and try again"
      );
    }
  })
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const thingTags = await db.ThingsToDoListTag.findAll();
    if (thingTags) {
      res.json(thingTags);
    } else {
      throw new Error("Error finding the ThingsToDoListTags. Please try again");
    }
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const thingTag = await db.ThingsToDoListTag.findByPk(req.params.id);
    if (thingTag) {
      res.json(thingTag);
    } else {
      throw new Error(
        `Error finding the thing tag with the id ${req.params.id}. Please try again`
      );
    }
  })
);

router.patch(
  "/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    const { updatedTagName } = req.body;
    const tagToUpdate = await db.ThingsToDoListTag.findByPk(req.params.id);
    if (tagToUpdate && updatedTagName) {
      await tagToUpdate.update({
        name: updatedTagName,
      });
      res.json(tagToUpdate);
    } else {
      throw new Error(
        `Error finding the thing tag with the id ${req.params.id}. Please try again`
      );
    }
  })
);

router.delete(
  "/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    const deletedThingTag = await db.ThingsToDoListTag.findByPk(req.params.id);
    if (deletedThingTag) {
      await deletedThingTag.destroy();
      res.json(deletedThingTag);
    } else {
      res
        .status(500)
        .json({ message: "The requested resource could not be found" });
    }
  })
);

module.exports = router;
