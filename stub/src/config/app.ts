import { HomeController } from '../controller/HomeController';
import { type IKoalaConfig } from '@koala-ts/framework/dist/config/types';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
    ]
};
