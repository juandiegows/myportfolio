import { User } from "./User.model";

export class Client {
    id: number = 0;
    name: string = '';
    description: string = '';
    spanish_description: string = '';
    url_logo: string = '';
    link_site: string = '';
    year: number = 0;
    topics: string[] = [];
    topics_spanish: string[] = [];
    count_participants: number = 0;
    participants: Array<User> = []; 
}
