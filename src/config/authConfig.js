import 'dotenv/config';

export const passportConfig = {
    credentials: {
        tenantID: process.env.TENANT_ID,
        clientID: process.env.CLIENT_ID
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: false,
        passReqToCallback: false,
        loggingLevel: "error",
        loggingNoPII: true,
    },
    protectedRoutes: {
        scopes: ["api://e7db502b-8ed9-4af6-8ed6-280918b39123"]
    },
    otherValues: {
        tenantName: process.env.TENANT_NAME
    }
}