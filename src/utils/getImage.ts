const baseUrl = 'https://robohash.org/set_set4';

const getImage = (imageId: string | number) => `${baseUrl}/${imageId}`;

export default getImage;
