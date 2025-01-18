# Pages

## Welcome Page

- **Welcome.tsx**
  - **Purpose**: Serves as the entry point for new users, providing options to get started or log in.
  - **Functionality**:
    - Displays a welcoming message and branding for the application.
    - Offers a "Get Started" button that navigates users to the main application interface.
    - Provides a "Log In" button for existing users to access their accounts.
    - Utilizes the `useNavigate` hook from `react-router-dom` for navigation.
    - Integrates with a toast notification system to display a welcome message upon starting.

## Login Page

- **Login.tsx**
  - **Purpose**: Provides a user interface for logging into the application.
  - **Functionality**:
    - Includes fields for entering email and password.
    - Validates user input and displays error messages for invalid credentials.
    - Utilizes supabase authentication services to verify user credentials.
    - Redirects authenticated users to their respective main dashboard.

## Registration Page

- **Register.tsx**
  - **Purpose**: Allows new users to create an account.
  - **Functionality**:
    - Provides a form for entering user details such as name, email, and password.
    - Validates input fields and ensures password strength.
    - Integrates with backend services to create a new user account.
    - Displays success or error messages based on registration outcome.

## Profile Page

- **Profile.tsx**
  - **Purpose**: Displays and allows editing of user profile information.
  - **Functionality**:
    - Shows current user details such as name, email, and profile picture.
    - Provides options to update personal information and change password.
    - Integrates with user services to save changes to the profile.

## Settings Page

- **Settings.tsx**
  - **Purpose**: Allows users to configure application settings.
  - **Functionality**:
    - Provides options to adjust notification preferences and privacy settings.
    - Integrates with backend services to save user settings.
    - Displays current settings and allows users to reset to defaults.

## Job Tracking Page

- **TrackJob.tsx**
  - **Purpose**: Provides real-time tracking information for a specific job, including location, timeline, and crew details.
  - **Functionality**:
    - Displays a live map showing the current location of the job, along with source and destination points.
    - Includes a timeline component that outlines key events and statuses of the job.
    - Shows detailed information about the crew involved in the job, including names, roles, and contact information.
    - Uses mock data to simulate job tracking for demonstration purposes.
    - Integrates with components like `LiveMap`, `Timeline`, and `CrewInfo` to provide a comprehensive tracking view.

## Job Details Page

- **JobDetails.tsx**
  - **Purpose**: Provides detailed information about a specific job.
  - **Functionality**:
    - Displays job details such as status, assigned crew, and timeline.
    - Allows users to update job status and assign or unassign crew members.
    - Integrates with job services to fetch and update job data.

## Quote History Page

- **QuoteHistory.tsx**
  - **Purpose**: Displays a history of quotes provided to the user, allowing them to review past quotes and their details.
  - **Functionality**:
    - Lists past quotes with key details such as date, items, source, destination, price, and status.
    - Allows users to click on a quote to view more detailed information.
    - Uses mock data to simulate a list of quotes for demonstration purposes.
    - Utilizes the `useNavigate` hook to direct users to detailed quote views.
    - Implements a status badge system to visually indicate the status of each quote (e.g., pending, accepted, expired).

## Equipment Dashboard Page

- **EquipmentDashboard.tsx**
  - **Purpose**: Provides a management interface for viewing and interacting with equipment data.
  - **Functionality**:
    - Displays a table of equipment items, including details such as name, type, and status.
    - Allows navigation to detailed views of individual equipment items for more information.
    - Integrates with the `equipmentService` to fetch and display equipment data.
    - Utilizes the `DataTable` component from `react-native-paper` for structured data presentation.
    - Includes a floating action button (FAB) for adding new equipment items.


## Vehicle Dashboard Page

- **VehicleDashboard.tsx**
  - **Purpose**: Provides a management interface for viewing and interacting with vehicle data.
  - **Functionality**:
    - Displays a table of vehicles, including details such as make, model, and status.
    - Allows navigation to detailed views of individual vehicles for more information.
    - Integrates with the `vehicleService` to fetch and display vehicle data.
    - Utilizes the `DataTable` component from `react-native-paper` for structured data presentation.
    - Includes a floating action button (FAB) for adding new vehicle records.

## Maintenance History Page

- **MaintenanceHistory.tsx**
  - **Purpose**: Displays the maintenance history of a vehicle.
  - **Functionality**:
    - Lists past maintenance records with details such as date, type, and cost.
    - Allows users to add new maintenance records.
    - Integrates with maintenance services to fetch and update records.
    

## Dashboard Page

- **Dashboard.tsx**
  - **Purpose**: Serves as the main landing page after login, providing an overview of key metrics and navigation to other sections.
  - **Functionality**:
    - Displays summary information such as recent activities, notifications, and quick links.
    - Integrates with various services to fetch and display data.

## Notifications Page

- **Notifications.tsx**
  - **Purpose**: Displays a list of notifications for the user.
  - **Functionality**:
    - Lists notifications with details such as type, date, and status.
    - Allows users to mark notifications as read or delete them.

## Help or Support Page

- **Help.tsx**
  - **Purpose**: Provides users with help resources and support contact information.
  - **Functionality**:
    - Displays FAQs, guides, and contact forms for support.
    - Integrates with a support service to submit queries.

## Reports Page

- **Reports.tsx**
  - **Purpose**: Allows users to generate and view reports.
  - **Functionality**:
    - Provides options to select report types and date ranges.
    - Displays generated reports in a readable format.

## Admin Page

- **Admin.tsx**
  - **Purpose**: Provides administrative functionalities for managing users and settings.
  - **Functionality**:
    - Lists users with options to add, edit, or delete accounts.
    - Allows configuration of application-wide settings. 