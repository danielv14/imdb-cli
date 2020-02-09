const IMDbPattern = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/;

export const isIMDbId = (id: string) => IMDbPattern.test(id);
