import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  approved: boolean;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;
  @Expose()
  make: string;
  @Expose()
  model: string;

  // @Transform 데코레이터를 통해 원래의 엔티티를 변환
  // obj => 원래 형태의 엔티티
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
