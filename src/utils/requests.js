export const pushImage = (url, image) => {
    console.log(image);
    return fetch(url, {
        method: 'PUT',
        body: image,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
