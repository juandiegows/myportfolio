import { User } from "../User.model";

export class ClientInfo {
  id: number = 0;
  name: string = '';
  description: string = '';
  url_logo: string = '';
  link_site: string = '';
  year: number = 0;
  topics: string[] = [];
  count_participants: number = 0;
  participants: Array<User> = [];
}
