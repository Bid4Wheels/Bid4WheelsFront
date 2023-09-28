import Resizer from 'react-image-file-resizer';

export const resizeFile = (file, width, height) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width, //317
            height, //204
            'JPEG',
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            'file',
        );
    });
