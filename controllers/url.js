const shortid = require("shortid")

const URL = require('../models/url')

async function handleGenrateUrl(req, resp) {
   const body = req.body;
   if (!body.url) return resp.status(400).json("url is required")
   const shortID = shortid();
   await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      vistitHistory: [],
   })
   return resp.json({ id: shortID });
}

module.exports = { handleGenrateUrl }