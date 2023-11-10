
//import { Request, Response, NextFunction } from 'express';
//import { RoleType } from '../dto/user.dto';

//export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
//  const user = req.currentUser; // Asumiendo que tienes un middleware para obtener el usuario actual
//  if (user && user.role === RoleType.ADMIN) {
//    next(); // Permitir que continúe si el usuario es administrador
//  } else {
//    return res.status(403).json({ message: 'Acceso no autorizado' });
 /// }
//};
