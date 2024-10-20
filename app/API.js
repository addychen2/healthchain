const ADDRESS = "http://localhost:8080";
import Cookies from "js-cookie";

let refreshCallback = null;

export function setRefreshCallback(callback) {
  refreshCallback = callback;
}

export async function add_food(food) {
    try {
        console.log('Adding food:', food);
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
        console.log('Food added successfully:', data);
        
        // Dispatch a custom event after successfully adding food
        window.dispatchEvent(new CustomEvent('foodAdded'));
        console.log("Food added event emitted");
        
        return data;
    } catch (error) {
        console.error('Error adding food:', error);
        throw error;
    }
}

export async function add_food_uid(food) {
  try {
    // Retrieve user_id from the cookie
    const userId = Cookies.get("user_id");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Prepare the payload with food, user_id, and today's date
    const payload = {
      food,
      user_id: userId,
      date: formattedDate,
    };

    const response = await fetch(ADDRESS + '/api/add_food', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Debug log
    // Dispatch a custom event after successfully adding food
    window.dispatchEvent(new CustomEvent('foodAdded'));
    console.log("Food added event emitted");
    return data; // Return the data here
  } catch (error) {
    console.error('Error fetching AI result:', error);
    throw error;
  }
}


export async function remove_food_uid(food){
  try{
    const userId = Cookies.get("user_id");
        // Get today's date in YYYY-MM-DD format


    const payload = {
      food,
      user_id: userId,
    };

    const response = await fetch(ADDRESS + '/api/remove_food', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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


export async function get_all_food(){
  try {
    const response = await fetch(ADDRESS + '/api/get_all_food', {
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

export async function get_all_food_uid(){
  try {

      const userId = Cookies.get("user_id");
  
      // Construct the URL with query parameters
      const response = await fetch(`${ADDRESS}/api/get_all_food_uid?user_id=${userId}`, {
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
      console.error('Error fetching meals:', error);
      throw error;
}
}


export async function all_food_calories(){
  try {
    console.log('Fetching all food calories...');
    const response = await fetch(ADDRESS + '/api/all_food_calories', {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    });

    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('All food calories data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching all food calories:', error);
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

export async function daily_calories() {
  try {
    // Retrieve user_id from the cookie
    const userId = Cookies.get("user_id");

    const response = await fetch(`${ADDRESS}/api/today_calories/?user_id=${userId}`, {
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
    console.error('Error fetching meals:', error);
    throw error;
  }
}

export async function get_target_calories() {
  try {
    // Retrieve user_id from the cookie
    const userId = Cookies.get("user_id");

    const response = await fetch(`${ADDRESS}/api/get_target_calories?user_id=${userId}`, {
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
    console.error('Error fetching target calories:', error);
    throw error;
  }
}

