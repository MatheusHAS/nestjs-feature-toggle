import { Injectable, NestMiddleware } from '@nestjs/common';

const users: any[] = [
  {
    name: 'Matheus',
    type: 'alpha',
    ip: '192.168.0.10',
  },
  {
    name: 'Kevin Mitnick',
    type: 'admin',
    ip: '127.0.0.1',
  },
];

@Injectable()
export class UserswitchMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {    
    req.user = {
      name: 'Usuário Padrão das interwebs',
      type: 'default',
      ip: req.ip
    };

    const userPosition = parseInt(req.query?.user);
    
    if (userPosition >= 0 &&  userPosition < users.length) {
      req.user = users[userPosition];
    }

    console.log(req.user);
    
    next();
  }
}
