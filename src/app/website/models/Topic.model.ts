import { TypeTopic } from "./TypeTopic.model";

export class Topic {
    id: number = 0;
    name: string = '';
    spanish_name: string = '';
    link_image: string = '';
    description: string = '';
    spanish_description: string = '';
    topic: Topic | null = null;
    type_topic: TypeTopic = new TypeTopic();
}