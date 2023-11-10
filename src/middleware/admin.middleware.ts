import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../user/dto/user.dto';

// Define una nueva interfaz que extienda la interfaz Request de Express
interface CustomRequest extends Request {
  currentUser?: {
    // Define la estructura del objeto currentUser según tus necesidades
    role: RoleType;
    // ... otras propiedades del usuario si es necesario
  };
}

// Middleware para verificar si el usuario es un administrador
export function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  const user = req.currentUser;
  if (user && user.role === RoleType.ADMIN) {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

// Decorador de método
export function Admin(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: CustomRequest, res: Response, next: NextFunction) {
    isAdmin(req, res, () => {
      originalMethod.apply(this, [req, res, next]);
    });
  };

  return descriptor;
}
