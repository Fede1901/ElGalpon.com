import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../shared/response/http.response';
import { UserDTO } from '../dto/user.dto';
import { Session } from 'express-session'; 
export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async renderHome(req: Request, res: Response) {
    // Obtener información del usuario desde la sesión
    const user = (req.session as Session & { user?: any }).user;
  
    // Renderizar la página de inicio y pasar la información del usuario
    res.render('home', { user});
  }
  
  async renderRegister(req: Request, res: Response) {
    res.render('register');
   
  }

  async registerUser(req: Request, res: Response) {
    try {
      // Obtén los datos del usuario del cuerpo de la solicitud
      const userDTO: UserDTO = req.body;

      // Llama al servicio para registrar al usuario
      const registeredUser = await this.userService.registerUser(userDTO);

      
      res.redirect("/home");
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async renderLogin(req: Request, res: Response) {
    res.render("login")
  }

  async login(req: Request, res: Response) {
    try {
      // Obtén las credenciales del usuario del cuerpo de la solicitud
      const { username, password } = req.body;
  
      // Llama al servicio para autenticar al usuario
      const authenticatedUser = await this.userService.authenticateUser(username, req.body.password);
  
      if (authenticatedUser) {
        // Establecer información del usuario en la sesión
        (req.session as Session & { user?: any }).user = {
          id: authenticatedUser.id,
          username: authenticatedUser.username,
          name: authenticatedUser.name,
         
        };
  
        
        res.redirect('/home');
      } else {
        res.status(401).json({ error: 'Credenciales de inicio de sesión inválidas' });
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}