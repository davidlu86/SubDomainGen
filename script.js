const API_KEY = 'dZs3YPmLtKo71Kum/iutvQ==wn01pVg7DbmnUl88';

class Generator {
    constructor() {
        // Car-Animal Button
        this.carAnimalBtn = document.getElementById('carAnimalBtn');
        // Baby-Country Button
        this.babyCountryBtn = document.getElementById('babyCountryBtn');
        // City-Motorcycle Button
        this.cityMotorcycleBtn = document.getElementById('cityMotorcycleBtn');
        
        // Result Display
        this.resultDisplay = document.getElementById('result');

        // Add event listeners
        this.carAnimalBtn.addEventListener('click', () => this.generateCarAnimal());
        this.babyCountryBtn.addEventListener('click', () => this.generateBabyCountry());
        this.cityMotorcycleBtn.addEventListener('click', () => this.generateCityMotorcycle());
    }

    async fetchData(url, params = {}) {
        try {
            // Construct URL with query parameters
            const queryParams = new URLSearchParams(params);
            const fullUrl = params ? `${url}?${queryParams.toString()}` : url;

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: { 
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async generateCarAnimal() {
        try {
            // Fetch car makes and animals
            const [carMakes, animals] = await Promise.all([
                this.fetchData('https://api.api-ninjas.com/v1/carmakes'),
                this.fetchData('https://api.api-ninjas.com/v1/animals')
            ]);

            // Fallback mock data
            const mockCarMakes = ['Toyota', 'Ford', 'Honda', 'BMW', 'Mercedes'];
            const mockAnimals = ['Lion', 'Eagle', 'Dolphin', 'Tiger', 'Elephant'];

            // Use real or mock data
            const selectedCar = carMakes && carMakes.length > 0 
                ? carMakes[Math.floor(Math.random() * carMakes.length)].make
                : mockCarMakes[Math.floor(Math.random() * mockCarMakes.length)];

            const selectedAnimal = animals && animals.length > 0 
                ? animals[Math.floor(Math.random() * animals.length)].name
                : mockAnimals[Math.floor(Math.random() * mockAnimals.length)];

            const combo = `${selectedCar.toLowerCase()}-${selectedAnimal.toLowerCase()}`;
            this.displayAndCopy(combo);
        } catch (error) {
            this.handleError(error);
        }
    }

	async generateBabyCountry() {
		try {
			// Fetch baby names and countries
			const [babyNamesResponse, countriesResponse] = await Promise.all([
				this.fetchData('https://api.api-ninjas.com/v1/babynames', { 
					gender: 'neutral',
					limit: 1 
				}),
				this.fetchData('https://api.api-ninjas.com/v1/countries', {
					// Add parameters to get a more diverse set of countries
					min_population: 1000000, // Countries with at least 1 million people
					limit: 10 // Fetch multiple countries to randomize
				})
			]);

			// Fallback mock data
			const mockBabyNames = ['Riley', 'Avery', 'Jordan', 'Quinn', 'Morgan'];
			const mockCountries = ['Canada', 'Australia', 'Brazil', 'Japan', 'Sweden', 
									'Germany', 'France', 'Italy', 'Spain', 'Netherlands'];

			// Use real or mock data for baby names
			const babyName = babyNamesResponse && babyNamesResponse.length > 0
				? babyNamesResponse[0]
				: mockBabyNames[Math.floor(Math.random() * mockBabyNames.length)];

			// Use real or mock data for countries
			let country;
			if (countriesResponse && countriesResponse.length > 0) {
				// Randomly select a country from the fetched list
				const randomCountry = countriesResponse[Math.floor(Math.random() * countriesResponse.length)];
				country = randomCountry.name;
			} else {
				// Fallback to mock countries
				country = mockCountries[Math.floor(Math.random() * mockCountries.length)];
			}

			const combo = `${babyName.toLowerCase()}-${country.toLowerCase()}`;
			this.displayAndCopy(combo);
		} catch (error) {
			console.error('Detailed error in generateBabyCountry:', error);
			this.handleError(error);
		}
	}

    async generateCityMotorcycle() {
        try {
            // Fetch cities and motorcycles
            const [citiesResponse, motorcyclesResponse] = await Promise.all([
                this.fetchData('https://api.api-ninjas.com/v1/cities', {
                    min_population: 100000,
                    limit: 1
                }),
                this.fetchData('https://api.api-ninjas.com/v1/motorcycles', {
                    make: 'Honda',
                    limit: 1
                })
            ]);

            // Fallback mock data
            const mockCities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
            const mockMotorcycles = ['Harley', 'Kawasaki', 'Yamaha', 'BMW', 'Ducati'];

            // Use real or mock data
            const city = citiesResponse && citiesResponse[0] && citiesResponse[0].name
                ? String(citiesResponse[0].name).toLowerCase()
                : mockCities[Math.floor(Math.random() * mockCities.length)];
            
            const motorcycle = motorcyclesResponse && motorcyclesResponse[0] && motorcyclesResponse[0].make
                ? String(motorcyclesResponse[0].make).toLowerCase()
                : mockMotorcycles[Math.floor(Math.random() * mockMotorcycles.length)];
            
            const combo = `${city}-${motorcycle}`;
            this.displayAndCopy(combo);
        } catch (error) {
            this.handleError(error);
        }
    }

    displayAndCopy(combo) {
        // Display the combo
        this.resultDisplay.textContent = combo;
        
        // Copy to clipboard
        this.copyToClipboard(combo);
    }

    copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-9999px';
        document.body.appendChild(tempTextArea);
        
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999);
        
        try {
            const successful = document.execCommand('copy');
            this.showNotification(successful ? 'Copied to clipboard!' : 'Unable to copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        
        document.body.removeChild(tempTextArea);
    }

    showNotification(message) {
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
		notification.classList.add('notification');
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }

    handleError(error) {
        console.error('Generation error:', error);
        this.resultDisplay.textContent = 'Failed to generate combo';
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Generator();
});