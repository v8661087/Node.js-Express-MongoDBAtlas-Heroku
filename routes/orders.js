const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const fineOrders = await Order.find();
    res.json(fineOrders);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const order = new Order({
    id: req.body.id,
    date: req.body.date,
    cart: req.body.cart,
    form: req.body.form,
    totalPrice: req.body.totalPrice,
    discountPrice: req.body.discountPrice,
    paymentStatus: req.body.paymentStatus,
  });
  try {
    const saveOrder = await order.save();
    res.json(saveOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const findOrder = await Order.findById(req.params.orderId);
    res.json(findOrder);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:orderId", auth, async (req, res) => {
  try {
    const removeOrder = await Order.remove({ _id: req.params.orderId });
    res.json(removeOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:orderId", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          paymentStatus: req.body.paymentStatus,
        },
      }
    );
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
