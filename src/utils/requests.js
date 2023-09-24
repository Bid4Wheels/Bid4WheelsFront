import { async } from 'q';

export const pushImage = (url, token, image) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(url);

    fetch(url, {
        method: 'PUT',
        headers: headers,
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
