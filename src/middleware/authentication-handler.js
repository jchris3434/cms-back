const jwt = require('jsonwebtoken');
const { responseHandler } = require('./response-handler');

const JWT_KEY = process.env.JWT_KEY;

const authenticateRole = (role) => {
  return (req, res, next) => {
    // Récupérer le token JWT depuis le header Authorization
    const token = req.headers.authorization;

    if (!token) {
      // Si aucun token n'est fourni, renvoyer une erreur d'authentification
      return responseHandler(null, 'Missing token', 401)
        .then((result) => res.status(401).json(result))
        .catch((error) => res.status(500).json(error));
    }

    try {
      // Vérifier et décoder le token JWT
      const decoded = jwt.verify(token, JWT_KEY);

      // Vérifier si le rôle décodé correspond au rôle requis
      if (decoded.userRole !== role) {
        // Si le rôle n'est pas autorisé, renvoyer une erreur d'autorisation
        return responseHandler(null, 'Unauthorized', 403)
          .then((result) => res.status(403).json(result))
          .catch((error) => res.status(500).json(error));
      }

      // Si le rôle est autorisé, passer au middleware suivant
      next();
    } catch (error) {
      // En cas d'erreur de décodage ou d'expiration du token, renvoyer une erreur
      return responseHandler(null, 'Invalid token', 401)
        .then((result) => res.status(401).json(result))
        .catch((error) => res.status(500).json(error));
    }
  };
};

module.exports = { authenticateRole };
