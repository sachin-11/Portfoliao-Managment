const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/Bootcamp")
//@desc get all bootcamps
//@route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find()
  res.status(200).json({
    success: true,
    data: bootcamp
  })
})

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const _id = req.params.id
  const bootcamp = await Bootcamp.findById(_id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

//@desc create bootcamp
//@route POST /api/v1/bootcamp
// @access private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({
    success: true,
    data: bootcamp
  })
})
//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
// @access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const _id = req.params.id
  const bootcamp = await Bootcamp.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true
  })
  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

//@desc Delete bootcamp
//@route Delete /api/v1/bootcamps/:id
// @access private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const _id = req.params.id
  const bootcamp = await Bootcamp.findByIdAndDelete(_id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: {} })
})
