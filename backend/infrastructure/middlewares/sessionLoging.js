const jwt = require('jsonwebtoken');

// Middleware para verificar la sesión y el token JWT almacenado en la sesión
exports.checkSession = (req, res, next) => {
    // Verifica si el token está presente en la sesión
    if (!req.session.token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        // Verifica y decodifica el token usando la clave secreta
        const decoded = jwt.verify(req.session.token, process.env.KEY_SECRET);
        req.user = decoded; // Almacena los datos decodificados del usuario en la solicitud
        next(); // Continúa con la siguiente middleware o ruta
    } catch (err) {
        // Maneja errores si el token ha expirado o es inválido
        return res.status(401).json({ error: 'Session expired or invalid token' });
    }
};
