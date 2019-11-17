import { User } from '../models/user';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const ANONYMOUS_ID = "5c80cd6b37c972165c7a0823";

export class AuthController {

    public signIn(req: Request, res: Response) {
        console.log('signIn');
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(401).send("Login faild");
                return;
            }

            if (!user) {
                res.status(401).send("Login faild");
                return;
            }

            if (user.pwd == req.body.pwd) {                
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                req.app.get("jwtSecret"));
                                
                res.json({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    jwt: token
                });
            }
            else {
                res.status(401).send("Login faild");
            }
        });
    }
}