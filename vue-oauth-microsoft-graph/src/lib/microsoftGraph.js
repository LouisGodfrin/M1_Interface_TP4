import * as msal from '@azure/msal-browser';

const requestedScopes = 
{
  scopes: ["User.Read"]
};

let msalInstance = null;

export async function initializeMsal() 
{
    if (msalInstance) 
    {
      // Avoid re-initializing if already initialized
      return;
    }
    console.log("Client ID:", process.env.VUE_APP_OAUTH_CLIENT_ID);
    msalInstance = new msal.PublicClientApplication({
      auth: 
      {
        clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common", // Verify the good authentification
        redirectUri: process.env.VUE_APP_REDIRECT_URI
      },
      cache: 
      {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
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

  // If user is already login
  const currentAccount = msalInstance.getActiveAccount();
  if (currentAccount) 
  {
    console.log("User already signed in:", currentAccount);
    return currentAccount; // Return the user that is login
  }

  try 
  {
    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    return authResult.account;
  } 
  catch (error) 
  {
    if (error.errorCode === "interaction_in_progress") 
    {
      console.error("Authentication interaction already in progress.");
    } else 
    {
      console.error("Error during sign-in:", error);
    }
    throw error;
  }
}
