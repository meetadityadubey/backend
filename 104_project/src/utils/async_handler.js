export const asyncHandler = (rquestHandler) => {
  (req, res, next) => {
    Promise.resolve(rquestHandler(req, res, next)).catch((err) => next(err));
  };
};

// export const async_handler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }
