// This file will call the server to get the player's userID

const initialiseUser = async () => {
    // Attempt to fetch the stored userID
    const savedUserID = localStorage.getItem("userID");
    const userID = (savedUserID) ? parseInt(savedUserID) : null;
    // Send an API request to get information about the current User
    const response = await fetch("http://localhost:8000/get-accountID", {
        method: "POST",
        // Tell our server Read information as a json object
        headers: { "Content-Type": "application/json" },
        // Pack the information neatly 
        body: JSON.stringify({
            user_id: userID,
        })
    })

    // Wait for a message from the server 
    // (currently waits indefinitely.)
    /* RECIEVES
    {
        "user_id": user.user_id, 
        "username": user.username, 
        "user_auth": user.user_UUID,
        "status": status
    }
    */
    const response_data = await response.json();

    // Store the user and their authentication to the browser
    localStorage.setItem("userID", response_data.user_id);
    localStorage.setItem("userAuth", response_data.user_auth);

    console.log(`Logged in as user: ${response_data.user_id}, status: ${response_data.status}`);
    return response_data;
};

export default initialiseUser;