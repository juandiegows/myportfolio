import { TypeTopicInfo } from "./TypeTopicInfo.model";

export class TopicInfo {
    id: number = 0;
    name: string = '';
    link_image: string = '';
    description: string = '';
    topic: TopicInfo | null = null;
    type_topic: TypeTopicInfo = new TypeTopicInfo();
}