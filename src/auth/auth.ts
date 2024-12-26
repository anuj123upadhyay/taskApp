import { account,databases,ID } from '../utils/appwrite';
import conf from '../config/conf';
import { Query } from 'appwrite';

// Initialize Appwrite client, account, and database services


const dbID = conf.appwriteDatabaseId;
const userCollectionID = conf.appwiteUserCollectionId
// const taskCollectionID = conf.appwriteCollectionId;

// Function to sign up a user
export const signUp = async (email: string, password: string, name: string, phone_number: string) => {
  try {
    const response = await account.create(ID.unique(), email, password);
    const userId = response.$id;

    // Store user details in the 'users' collection
    await storeUserDetailsToCollection(userId, name, email, phone_number);

    return { success: true, userId };
  } catch (error:any) {
    console.error('Sign Up Error:', error);
    return { success: false, message: error.message };
  }
};

// Function to login a user
export const logIn = async (email: string, password: string) => {
  try {
    const session = await account.createSession(email, password);
    return { success: true, session };
  } catch (error:any) {
    console.error('Login Error:', error);
    return { success: false, message: error.message };
  }
};

// Function to logout a user
export const logOut = async () => {
  try {
    await account.deleteSession("current");
    return { success: true, message: 'Logged out successfully.' };
  } catch (error:any) {
    console.error('Logout Error:', error);
    return { success: false, message: error.message };
  }
};

// Function to get the current logged-in user's details
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return { success: true, user };
  } catch (error:any) {
    console.error('Get User Error:', error);
    return { success: false, message: error.message };
  }
};

// Function to store user details in the Appwrite user collection
const storeUserDetailsToCollection = async (userId: string, name: string, email: string, phone_number: string) => {
  try {
    await databases.createDocument(dbID, userCollectionID, ID.unique(), {
      userId,
      name,
      email,
      phone_number,
      notification_type: 'sms', // Default notification type, can be updated
    });
  } catch (error) {
    console.error('Error storing user details:', error);
  }
};

// Function to retrieve user details from the user collection
export const getUserDetails = async (userId: string) => {
  try {
    const result = await databases.listDocuments(dbID, userCollectionID, [
      Query.equal('userId', userId),
    ]);
    return { success: true, user: result.documents[0] };
  } catch (error:any) {
    console.error('Error fetching user details:', error);
    return { success: false, message: error.message };
  }
};
