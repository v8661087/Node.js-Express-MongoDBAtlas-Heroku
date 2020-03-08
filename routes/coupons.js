const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const fineCoupons = await Coupon.find();
    res.json(fineCoupons);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", auth, async (req, res) => {
  const coupon = new Coupon({
    title: req.body.title,
    code: req.body.code,
    due_date: req.body.due_date,
    percent: req.body.percent,
    is_enabled: req.body.is_enabled
  });
  try {
    const saveCoupon = await coupon.save();
    res.json(saveCoupon);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:couponId", async (req, res) => {
  try {
    const findCoupon = await Coupon.findById(req.params.couponId);
    res.json(findCoupon);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:couponId", auth, async (req, res) => {
  try {
    const removeCoupon = await Coupon.remove({ _id: req.params.couponId });
    res.json(removeCoupon);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:couponId", auth, async (req, res) => {
  try {
    const updateCoupon = await Coupon.updateOne(
      { _id: req.params.couponId },
      {
        $set: {
          title: req.body.title,
          code: req.body.code,
          due_date: req.body.due_date,
          percent: req.body.percent,
          is_enabled: req.body.is_enabled
        }
      }
    );
    res.json(updateCoupon);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
