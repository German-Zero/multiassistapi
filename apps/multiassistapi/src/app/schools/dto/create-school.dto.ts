export class CreateSchoolDto {
  name: string;
  address: {
    provincia: string;
    ciudad: string;
    calle: string;
    postCode: string;
  };
}
