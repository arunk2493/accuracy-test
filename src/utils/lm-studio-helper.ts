import axios from 'axios';

export class LMStudioAPI {
    
    private baseUrl: string;
    

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    async startModel(): Promise<void> {
        
        const startCommand = 'lms load mlx-community/Llama-3.2-3B-Instruct-4bit -y && lms server start'; // Adjust this command based on your setup
        try {
            let modelProcess: any;
            console.log('Starting the LMS server...');
            modelProcess = execPromise(startCommand);
            console.log('LMS server started successfully.');
        } catch (error) {
            console.error('Failed to start the LMS server:', error);
            throw error;  // Fail the test if the server doesn't start
        }
    }

    async stopModel(): Promise<void> {
        // Command to stop the LM Studio server
        const stopCommand = 'lms server stop && lms unload --all'; // Adjust this command based on your setup
        try {
            console.log('Stopping the LMS server...');
            execPromise(stopCommand);
            console.log('LMS server stopped successfully.');
        } catch (error) {
            console.error('Failed to stop the LMS server:', error);
            throw error;  // Fail the test if the server doesn't stop
        }
    }

    async queryModel(requestBody: any): Promise<any> {
        try {
          const response = await axios.post(`${this.baseUrl}/v1/chat/completions`,requestBody, {
              headers: {
                'Content-Type': 'application/json', // Ensure the server expects JSON
              },
            });
          return response.data;
        } catch (error) {
          // Simplified error handling
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Error:', message);
          throw new Error('Error querying the model: ' + message);
        }
    }
}
function execPromise(startCommand: string): any {
    throw new Error('Function not implemented.');
}

