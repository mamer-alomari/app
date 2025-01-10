# Create the root directory
mkdir fleet-management
cd fleet-management

# Initialize the monorepo with Turborepo
npx create-turbo@latest

# Remove default apps and packages
rm -rf apps packages 