import { Observable, Frame } from '@nativescript/core';
import { Camera, requestCameraPermissions } from '@nativescript/camera';
import * as imagepicker from '@nativescript/imagepicker';
import axios from 'axios';

export class CameraViewModel extends Observable {
    constructor() {
        super();
    }

    async onTakePhoto() {
        try {
            const permission = await requestCameraPermissions();
            if (!permission) {
                console.log('Camera permission denied');
                return;
            }

            const camera = new Camera();
            const imageAsset = await camera.takePicture({
                width: 1024,
                height: 1024,
                keepAspectRatio: true,
                saveToGallery: false
            });

            await this.processImage(imageAsset);
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    }

    async onUploadImage() {
        try {
            const context = imagepicker.create({
                mode: "single"
            });

            const selection = await context.present();
            if (selection.length > 0) {
                await this.processImage(selection[0]);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    }

    private async processImage(imageAsset: any) {
        try {
            // Convert image to base64
            const imageBase64 = await this.imageAssetToBase64(imageAsset);

            // Send to object detection API
            const detectedObjects = await this.detectObjects(imageBase64);

            // Navigate to items page with detected objects
            Frame.topmost().navigate({
                moduleName: "pages/quote/quote-page",
                context: {
                    detectedObjects: detectedObjects
                }
            });
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }

    private async imageAssetToBase64(imageAsset: any): Promise<string> {
        // Implementation to convert ImageAsset to base64
        // You'll need to implement this based on NativeScript's image processing capabilities
        return '';
    }

    private async detectObjects(imageBase64: string) {
        try {
            const response = await axios.post('YOUR_OBJECT_DETECTION_API_ENDPOINT', {
                image: imageBase64
            });
            return response.data.objects;
        } catch (error) {
            console.error('Object detection failed:', error);
            return [];
        }
    }

    onBack() {
        Frame.topmost().goBack();
    }
}