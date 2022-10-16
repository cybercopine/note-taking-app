export const postData = async (url = '', data = {}, postHandler) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
  
    try {
        await response.json()
        postHandler();
        
    }
    catch (error) {
        console.log("error", error);
    }
  }

export const getData = async (url = '', getHandler) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });
    try {
        let userNotes = await response.json();
        getHandler(userNotes);
    }
    catch (error) {
        console.log("error", error);
    }
}

