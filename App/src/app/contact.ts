export interface Contact {
    $key: string;
    name: string;
    phone: string;
    contactCompanies: {[key: string]: {name: string}};
    imageURL?: string; // optional
    location?: string;
}
