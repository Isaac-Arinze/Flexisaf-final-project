# MongoDB Connection Setup Guide

## Issue Identified
The MongoDB cluster `cluster0.xifnnit.mongodb.net` in your connection string doesn't exist, causing the `ENOTFOUND` DNS error.

## Solution Options

### Option 1: Create a New MongoDB Atlas Cluster (Recommended)

1. **Go to MongoDB Atlas**: Visit [https://cloud.mongodb.com/](https://cloud.mongodb.com/)

2. **Sign in or Create Account**: Use your existing account or create a new one

3. **Create a New Cluster**:
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "flexidigihealth-cluster")

4. **Set up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (remember these!)
   - Set privileges to "Read and write to any database"

5. **Set up Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add your specific IP addresses

6. **Get Connection String**:
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

7. **Update .env file**:
   ```
   MONGODB_URI = 'mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/flexidigiHealth?retryWrites=true&w=majority'
   ```

### Option 2: Use Local MongoDB (For Development)

If you want to test locally without Atlas:

1. **Install MongoDB locally**:
   ```bash
   # On macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb/brew/mongodb-community
   ```

2. **Update .env file for local connection**:
   ```
   MONGODB_URI = 'mongodb://localhost:27017/flexidigiHealth'
   ```

## Files Fixed

1. **backend/config/mongodb.js**: 
   - Removed deprecated options (`useNewUrlParser`, `useUnifiedTopology`)
   - Added proper error handling
   - Added connection success/failure logging

2. **backend/.env**: 
   - Updated with placeholder for correct connection string
   - Added setup instructions as comments

## Next Steps

1. Choose one of the options above
2. Update your `.env` file with the correct connection string
3. Test the connection by running `npm start` in the backend directory

## Testing the Connection

After updating your connection string, test it:

```bash
cd backend
npm start
```

You should see:
- "Server started on port 4000"
- "Database Connected"
- "MongoDB connection successful"

If you still see errors, double-check:
- Username and password are correct
- IP address is whitelisted in Atlas
- Connection string format is correct
