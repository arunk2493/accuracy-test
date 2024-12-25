import axios from 'axios';

export class LMStudioAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async startModel(modelPath: string, options: Record<string, any> = {}): Promise<void> {
        console.log(`Starting model at path: ${modelPath}`);
        const response = await axios.post(`${this.baseUrl}/start`, {
            modelPath,
            ...options,
        });
        if (response.status !== 200) {
            throw new Error(`Failed to start model: ${response.data.message}`);
        }
    }

    async stopModel(): Promise<void> {
        console.log('Stopping model...');
        const response = await axios.post(`${this.baseUrl}/stop`);
        if (response.status !== 200) {
            throw new Error(`Failed to stop model: ${response.data.message}`);
        }
    }

    async queryModel(prompt: string, options: Record<string, any> = {}): Promise<string> {
        console.log(`Querying model with prompt: "${prompt}"`);
        const response = await axios.post(`${this.baseUrl}/query`, {
            prompt,
            ...options,
        });
        if (response.status !== 200) {
            throw new Error(`Failed to query model: ${response.data.message}`);
        }
        return response.data.choices[0].text.trim();
    }
}
