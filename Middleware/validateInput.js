const validateInput = (req, res, next) => {
    const { title, description, completed } = req.body;
    if (!title || !description || completed === undefined || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Title, description, or completed is missing or invalid" });
    }
    next();
  };

  module.exports = validateInput;