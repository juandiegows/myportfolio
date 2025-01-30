export class Event {
    id!: number;
    user_id!: number;
    date!: string;
    title!: string;
    spanish_title!: string;
    description!: string;
    spanish_description!: string;
    url!: string;
    type!: string;
    is_initial!: boolean;
    created_at!: string;
    updated_at!: string;
    url_full!: string;
  
    constructor(init?: Partial<Event>) {
      Object.assign(this, init);
    }
  }
  