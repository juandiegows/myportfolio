export class Profession {
  id: number;
  name: string;
  name_spanish: string;

  constructor(id?: number, name?: string, name_spanish?: string) {
    this.id = id || 0;
    this.name = name || '';
    this.name_spanish = name_spanish || '';
  }
}
