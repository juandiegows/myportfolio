import { ProfessionInfo } from "./ProfessionInfo.model"

export class WorkInfo {
    id: number = 0
    logo: String | null = null
    business: string = ""
    profession: ProfessionInfo = new ProfessionInfo
    description: string = ""
    spanish_description: string = ""
    certificate_url: string = ""
    topics: string[] = []
    topics_spanish: string[] = []
    start_date: string = ""
    end_date: string | null = null
}