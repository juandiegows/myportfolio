import { Profession } from "./Profession.model"
import { SocialMedia } from "./SocialMedia.model"

export class User
{
  id: number = 0
  name: string = ""
  last_name: string = ""
  email: string = ""
  user_name: string = ""
  created_at: Date | null  = null;
  updated_at: Date | null  = null;
  active: boolean =false;
  is_principal: boolean = false;
  professions: Profession[] = []
  social_medias: SocialMedia[] = []
}
