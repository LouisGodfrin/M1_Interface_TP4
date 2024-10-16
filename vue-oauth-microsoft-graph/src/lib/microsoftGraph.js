import * as msal from '@azure/msal-browser';

const requestedScopes = 
{
  scopes: ["User.Read"]
};

let msalInstance = null;

export async function initializeMsal() 
{
    console.log("Client ID:", process.env.VUE_APP_OAUTH_CLIENT_ID);
    msalInstance = new msal.PublicClientApplication({
      auth: 
      {
        clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
      },
      cache: 
      {
        cacheLocation: 'sessionStorage',
      }
    });
    
    await msalInstance.initialize();
  
}

export async function signInAndGetUser() 
{
  
  if (!msalInstance) 
    {
        throw new Error("MSAL instance is not initialized. Call initializeMsal() first.");
    }

  try 
  {
    await initializeMsal().then( )
    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    return authResult.account;
  } 
  catch (error) 
  {
    console.error("Error during sign-in:", error);
    throw error;
  }
}
