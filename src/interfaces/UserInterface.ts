export interface user {
    id?: number
    name: string
    phone: string
    email: string
    username: string
    website: string
    address?: address
}

export interface address {
    city : string
    street : string
    suite : string
    zipcode : string
}