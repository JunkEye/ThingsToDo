const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler")
const db = require("../db/models")
const {Op} = require("sequelize")

router.get("/", expressAsyncHandler(async () => {

}))

router.get("/:businessId", expressAsyncHandler(async () => {
    
}))


router.post("/", expressAsyncHandler(async (req, res, next) => {
    try {
        const {
            name,
            primaryPhoto,
            address,
            city,
            stateProvince,
            country,
            zipcode
        } = req.body;

        if (name && city && stateProvince && country && zipcode) {
            const newBusiness = await db.Business.create({
                name, primaryPhoto ,address, city, stateProvince, country, zipcode
            })

            res.json(newBusiness)
        } else {
            throw new Error("Not all required info was provided for a business to be created")
        }
    } catch (e) {
        next(e)
    }
}))

module.exports = router