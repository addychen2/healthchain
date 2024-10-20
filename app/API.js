const ADDRESS = "http://localhost:8080";


export async function add_food(food) {
    try {
        const response = await fetch(ADDRESS + '/api/log_food', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ food }),
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('API response:', data); // Debug log
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching AI result:', error);
        throw error;
    }
}

export async function login(email, password) {
    try {
        const response = await fetch(ADDRESS + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('API response:', data); // Debug log
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching AI result:', error);
        throw error;
    }
}


export async function logout() {
  try {
    const response = await fetch(ADDRESS + '/logout', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Debug log
    return data; // Return the data here
  } catch (error) {
    console.error('Error fetching AI result:', error);
    throw error;
  }
}