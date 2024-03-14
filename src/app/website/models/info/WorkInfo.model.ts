import { ProfessionInfo } from "./ProfessionInfo.model"

export class WorkInfo {
    id: number = 0
    logo: String | null = null
    business: string = ""
    profession: ProfessionInfo = new ProfessionInfo
    description: string = ""
    certificate_url: string = ""
    topics: string[] = []
    start_date: string = ""
    end_date: string | null = null
}