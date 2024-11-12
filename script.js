const API_KEY = 'dZs3YPmLtKo71Kum/iutvQ==wn01pVg7DbmnUl88';

class CarAnimalGenerator {
    constructor() {
        this.resultElement = document.getElementById('generateBtn');
        this.resultDisplay = document.getElementById('result');
        this.resultElement.addEventListener('click', () => this.generateCombo());
    }

    async fetchData(url) {
        try {
            const response = await fetch(url, {
                headers: { 'X-Api-Key': API_KEY }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async generateCombo() {
        try {
            // Use mock data as a fallback
            const carMakes = ['Toyota', 'Ford', 'Honda', 'BMW', 'Mercedes'];
            const animals = ['Lion', 'Eagle', 'Dolphin', 'Tiger', 'Elephant'];

            const randomCar = carMakes[Math.floor(Math.random() * carMakes.length)];
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            
            const combo = `${randomCar.toLowerCase()}-${randomAnimal.toLowerCase()}`;
            
            // Display the combo
            this.resultDisplay.textContent = combo;
            
            // Copy to clipboard
            this.copyToClipboard(combo);
        } catch (error) {
            console.error('Generation error:', error);
            this.resultDisplay.textContent = 'Failed to generate combo';
        }
    }

    copyToClipboard(text) {
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        
        // Make the textarea out of viewport
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-9999px';
        document.body.appendChild(tempTextArea);
        
        // Select the text
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Copied to clipboard!' : 'Unable to copy';
            
            // Optional: Show a temporary notification
            this.showNotification(msg);
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        
        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'green';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CarAnimalGenerator();
});