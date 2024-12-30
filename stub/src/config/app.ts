import { HomeController } from '../controller/HomeController';
import { IKoalaConfig } from '@koala-ts/framework';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
    ]
};
