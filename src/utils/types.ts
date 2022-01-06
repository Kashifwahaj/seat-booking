// export interface SeatRowEntity {
//     id: number;
//     rowName: string;
//     price: number;
//     gap: number;
//     rowForPrice: boolean;
//     seats: (SeatEntity)[];
//   }
//   export interface SeatEntity {
//     id: number;
//     seatNumber: string;
//     isBooked: boolean;
//     isSelected: boolean;
//   }
  

export interface SeatEntity {
    id: number | String;
    seatNumber: string;
    isBooked: boolean;
    isSelected: boolean;
    rowName: string;
    gap: number;
    rowForPrice: boolean;
    category:CategoryEntity
  }

  export interface CategoryEntity {
    name:string;
    price:number;
}
  export type SeatDataEntity =SeatEntity[];
  
  