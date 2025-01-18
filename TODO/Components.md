# Components

## Customer Components

- **PreferencesSettings.tsx**
  - **Purpose**: Manages user preferences settings.
  - **Functionality**: 
    - Provides a user interface for updating personal information and notification settings.
    - Integrates with backend services to save and retrieve user preferences.
    - Utilizes form elements to capture user input and validate data before submission.
    - Uses a toast notification to welcome users when they start.


- **NotificationSettings.tsx**
  - **Purpose**: Handles user notification settings.
  - **Functionality**:
    - Offers a UI for users to customize their notification preferences, such as email and SMS alerts.
    - Communicates with notification services to update user settings.
    - Includes toggles or checkboxes for enabling/disabling specific notifications.

- **AddressBook.tsx**
  - **Purpose**: Manages user address information.
  - **Functionality**:
    - Allows users to add, edit, and delete addresses.
    - Connects with the backend to persist address data.
    - Displays a list of saved addresses with options to modify or remove them.

## Vehicle Components

- **DocumentList.tsx**
  - **Purpose**: Displays and manages vehicle documents.
  - **Functionality**:
    - Shows current vehicle documents such as registration and insurance.
    - Allows users to update documents by uploading new files.
    - Utilizes utility functions for formatting document expiry dates.

- **AddServiceRecord.tsx**
  - **Purpose**: Adds new service records for vehicles.
  - **Functionality**:
    - Provides a form for entering service details like service type, date, and mileage.
    - Submits the form data to the maintenance service to add a new record.
    - Includes validation to ensure all required fields are filled out.
    - Uses a toast notification to confirm the addition of a new service record.
    - service record is added to the vehicle's service record list.
    - service records are displayed in a table with columns for date, type, and mileage.
    - service records are sorted by date in descending order.
    - service records are displayed in a table with columns for date, type, and mileage.


- **FuelingHistory.tsx**
  - **Purpose**: Displays vehicle fueling history.
  - **Functionality**:
    - Lists past fueling records with details such as location, date, and cost.
    - Allows users to add new fueling records through a modal form.
    - fueling records submitted through the form are added to the vehicle's fueling history.
    - Uses utility functions to format fueling data for display.
    - fueling records are displayed in a table with columns for date, location, and cost.
    - fueling records are sorted by date in descending order.



## Common Components

- **LoadingSpinner.tsx**
  - **Purpose**: Displays a loading spinner for asynchronous operations.
  - **Functionality**:
    - Provides a visual indicator while data is being loaded or processed.
    - Can be used across various components to enhance user experience during loading states.

- **ErrorMessage.tsx**
  - **Purpose**: Displays error messages in a consistent format.
  - **Functionality**:
    - Shows error alerts with a standardized appearance.
    - Can be integrated into components to handle and display error messages from API calls or form validations.

## Provider Components

- **EquipmentDashboard.tsx**
  - **Purpose**: Displays a dashboard for managing equipment.
  - **Functionality**:
    - Lists equipment details such as name, type, and status.
    - Allows navigation to detailed views of individual equipment items.
    - Integrates with the equipment service to fetch and display data.
    - equipment is added to the equipment list.
    - equipment is displayed in a table with columns for name, type, and status.
    - equipment is sorted by name in ascending order.
    - equipment updated through the form are added to the equipment list.


- **VehicleDashboard.tsx**
  - **Purpose**: Displays a dashboard for managing vehicles.
  - **Functionality**:
    - Lists vehicle details including make, model, and status.
    - Provides navigation to detailed views of individual vehicles.
    - Uses vehicle service to retrieve and display vehicle data.
    - vehicle is added to the vehicle list.
    - vehicle is displayed in a table with columns for make, model, and status.
    - vehicle is sorted by make in ascending order.
    - vehicle updated through the form are added to the vehicle list.


## Page Components

- **Welcome.tsx**
  - **Purpose**: Displays a welcome page with options to get started or log in.
  - **Functionality**:
    - Offers buttons to navigate to the main application or login page .

    - Uses a toast notification to welcome users when they start.


- **TrackJob.tsx**
  - **Purpose**: Displays live tracking information for a job.
  - **Functionality**:
    - Shows a live map with the current location, source, and destination.
    - Displays a timeline of job events and crew information.
    - Integrates with map and timeline components to provide a comprehensive tracking view.
    - job is retrieved from the job list.
    - job is displayed in a table with columns for source, destination, and status.
    - job is sorted by source in ascending order.
    - job updated through the form are added to the job list for vendors , customers and jobs.

- **QuoteHistory.tsx**
  - **Purpose**: Displays a history of quotes.
  - **Functionality**:
    - Lists past quotes with details such as date, items, and status.
    - Allows users to view detailed information about each quote.
    - Uses mock data to simulate quote history for demonstration purposes. 


- **JobHistory.tsx**
  - **Purpose**: Displays a history of jobs.
  - **Functionality**:
    - Lists past jobs with details such as date, items, and status.
    - Allows users to view detailed information about each job.
    - Uses mock data to simulate job history for demonstration purposes. 


- **JobList.tsx**
  - **Purpose**: Displays a list of jobs.
  - **Functionality**:
    - Lists jobs with details such as date, items, and status.
    - Allows users to view detailed information about each job.
    - Uses mock data to simulate job history for demonstration purposes. 


- **JobDetails.tsx**
  - **Purpose**: Displays detailed information about a job.
  - **Functionality**:
    - Shows detailed information about a specific job, including source, destination, items, and status.
    - Allows users to view detailed information about each job.
    - contact information for the job is displayed in a table with columns for name, phone, and email.
    - job is retrieved from the job list.
    - job is displayed in a table with columns for source, destination, and status.
    - items are sorted by source in ascending order.
    - job updated through the form are added to the job list for vendors , customers and jobs.

    


