import { CarImage } from "../infra/typeorm/entities/Carimage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
