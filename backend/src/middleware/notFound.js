function notFound(req, res, next) {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist`,
    method: req.method,
    timestamp: new Date().toISOString()
  });
}

export default notFound;