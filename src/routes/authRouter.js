import { Router } from "express";
import { authProvider } from "./../utils/auth/AuthProvider.js";
import { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } from "./../config/authConfig.js";

const router = Router();

router.get("/singin",
    (req, res, next)=> {
        console.log("-------", req.session.isAuthenticated);
        next();        
    },
    authProvider.login({
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
    successRedirect: '/'
})
);

router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['User.Read'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile'
}));

router.post('/redirect', 
    (req, res, next) => {
        console.log("-------redirect");
        next();
    },
    authProvider.handleRedirect());

router.get('/signout', authProvider.logout({
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI
}));

export default router;