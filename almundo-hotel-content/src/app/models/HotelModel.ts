export interface HotelModel {
    id: number;
    name: string;
    stars: number;
    price: number;
    image: string;
    amenities: Array<string>
}