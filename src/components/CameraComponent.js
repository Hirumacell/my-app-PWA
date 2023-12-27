// CameraComponent.js
import React, { useRef } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }, // Utiliser la caméra arrière
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const capture = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL('image/jpeg');
        console.log(imageSrc); // Vous pouvez utiliser l'image capturée comme bon vous semble
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={startCamera}>Démarrer la caméra</button>
            <button onClick={capture}>Capture photo</button>
        </div>
    );
};

export default CameraComponent;
