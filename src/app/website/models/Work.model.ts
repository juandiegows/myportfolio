import { Profession } from "./Profession.model"

export class Work {
    id: number = 0
    logo: String | null = null
    business: string = ""
    profession: Profession = new Profession
    description: string = ""
    spanish_description: string = ""
    certificate_url: string = ""
    topics: string[] = []
    topics_spanish: string[] = []
    start_date: string = ""
    end_date: string | null = null
}