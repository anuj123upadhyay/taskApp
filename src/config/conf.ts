const conf = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwiteUserCollectionId:String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteHuggingFaceApiUrl:String(import.meta.env.VITE_HF_API_URL),
    appwriteTwilioAccountSid:String(import.meta.env.VITE_TWILIO_ACCOUNT_SID),
    appwriteTwilioAuthToken:String(import.meta.env.VITE_TWILIO_AUTH_TOKEN),
    appwriteTwilioPhoneNumber:String(import.meta.env.VITE_TWILIO_PHONE_NUMBER),
    appwriteFunctionId:String(import.meta.env.VITE_APPWRITE_FUNCTION_ID),

}

export default conf;