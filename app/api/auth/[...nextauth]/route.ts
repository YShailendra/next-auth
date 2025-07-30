import NextAuth from "next-auth"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"

 const superTokensConfig = {
    issuer: process.env.APP_AUTH_ENDPOINT || "",
    clientId: process.env.SUPERTOKEN_CLIENT_ID || "",
    clientSecret: process.env.SUPERTOKEN_CLIENT_SECRET||"",
    callbackURL: `http://localhost:3000/api/auth/callback/supertokens`,
  };
  
console.log(superTokensConfig);
export interface SuperTokensProfile {
  sub: string;
  email?: string;
  email_verified?: boolean;
}

export function SuperTokensProvider(options: OAuthUserConfig<SuperTokensProfile>): OAuthConfig<SuperTokensProfile> {
  console.log('[SuperTokensProvider] Initializing with options:', {
    issuer: options.issuer,
    clientId: options.clientId,
    hasClientSecret: !!options.clientSecret
  });
  
  return {
    id: "supertokens",
    name: "SuperTokens",
    type: "oauth",
    issuer: options.issuer,
    checks: ["pkce", "state"],
    authorization: {
      url: `${options.issuer}/api/auth/oauth/auth`,
      params: {
        scope: "offline_access admin email profile openid",
        response_type: "code",
      },
    },
    
    token: {
      url: `${options.issuer}/api/auth/oauth/token`,
      async request(context) {
        console.log('[SuperTokensProvider] Token exchange started');
        const { provider, params, checks } = context;
        
        console.log('[SuperTokensProvider] Context received:', {
          code: params.code?.substring(0, 10) + '...',
          callbackUrl: provider.callbackUrl,
          clientId: provider.clientId,
          hasClientSecret: !!provider.clientSecret,
          hasCodeVerifier: !!checks?.code_verifier
        });
        
        const tokenParams = new URLSearchParams({
          grant_type: 'authorization_code',
          code: params.code!,
          redirect_uri: provider.callbackUrl,
        });
        
        // Add PKCE verifier if present
        if (checks?.code_verifier) {
          console.log('[SuperTokensProvider] Adding PKCE code_verifier to request');
          tokenParams.append('code_verifier', checks.code_verifier);
        }
        
        const tokenUrl = typeof provider.token === 'string' ? provider.token : provider.token!.url!;
        
        console.log('[SuperTokensProvider] Token exchange request details:', {
          url: tokenUrl,
          method: 'POST',
          params: Object.fromEntries(tokenParams.entries()),
          paramsKeys: Array.from(tokenParams.keys())
        });
        
        try {
          const basicAuth = Buffer.from(`${provider.clientId}:${provider.clientSecret}`).toString('base64');
          console.log('[SuperTokensProvider] Using Basic authentication for token exchange');
          
          const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${basicAuth}`,
            },
            body: tokenParams,
          });
          
          if (!response.ok) {
            const responseText = await response.text();
            console.error('[SuperTokensProvider] Token exchange failed with error');
            throw new Error(`Token exchange failed: ${response.status} ${responseText}`);
          }
          
          try {
            const token = await response?.json();
            console.log('[SuperTokensProvider] Token exchange successful:', token)
            return token;
          } catch (e) {
             const responseText = await response.text();
            console.error('[SuperTokensProvider] Failed to parse token response:', e);
            throw new Error(`Failed to parse token response: ${responseText}`);
          }
        } catch (error) {
          console.error('[SuperTokensProvider] Token exchange error:', error);
          throw error;
        }
      },
    },
    idToken:true,
   profile (profile) {
  try {
    console.log("[SuperTokensProvider] Raw profile:", profile);
    //console.log("[SuperTokensProvider] Raw Tokens:", tokens);
    if (!profile?.sub || !profile?.email) {
      throw new Error("Invalid profile received from userinfo endpoint");
    }

    return {
      id: profile.sub,
      email: profile.email,
      emailVerified: profile.email_verified ?? false,
    };
  } catch (err) {
    console.error("❌ Error in profile() mapping:", err);
    throw new Error("Failed to map user profile from SuperTokens");
  }
},
    ...options,
  };
}


const handler = NextAuth({
  debug: true,
  providers: [
    SuperTokensProvider({
        issuer: superTokensConfig.issuer,
        clientId: superTokensConfig.clientId,
        clientSecret: superTokensConfig.clientSecret,  
    }),
  ],

  callbacks: {
   async session({ session }) {
    console.log("Default is been called")
    return session;
  },
  async jwt({ token }) {
    console.log("Default is been called")
    return token;
  },
  signIn() {
    console.log("Default is been called")
    return true;
  },
  redirect() {
    return "/dashboard";
  },
  },
  session: { strategy: "jwt" },
  secret:"secret"
})

export { handler as GET, handler as POST };
