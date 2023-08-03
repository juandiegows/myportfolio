import { SocialMedia } from "./SocialMedia.model"

export class SocialMediaUser {
  id: number =0
  user_id: number =0
  social_media_id: number =0
  link: string = ""
  is_principal: boolean = false
  social_media: SocialMedia = new SocialMedia()
}
