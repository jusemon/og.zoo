import { BaseEntity } from 'src/app/shared/generics/base-entity';

export interface Infirmary extends BaseEntity {
    idAnimal: string;
    admissionDate: Date;
    diagnosis: string;
}
