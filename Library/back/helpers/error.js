export const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Erro interno no servidor';
    return res.status(statusCode).json({ error: message });
};

