import { AxiosRequestConfig } from 'axios'
import { APIParam, BaseAPI } from 'decentraland-dapps/dist/lib/api'
import { env } from 'decentraland-commons'

export type Post = {
  title: string
  raw: string
  topic_id?: number
  category?: number
  archetype?: string
  created_at?: string
}

export type CreateSuccess = {
  id: number
  name: string
  username: string
  topic_slug: string
  display_username: string
  created_at: string
  cooked: string
  errors: undefined
}

export type CreateError = {
  action: string
  errors: string[]
}

export const FORUM_URL = env.get('REACT_APP_FORUM_URL', '')
const FORUM_API_KEY = env.get('REACT_APP_FORUM_API_KEY', '')

export class ForumAPI extends BaseAPI {
  request(method: AxiosRequestConfig['method'], path: string, params?: APIParam | null, config?: AxiosRequestConfig) {
    if (!config) {
      config = {
        headers: {}
      }
    }
    config.headers = {
      ...config.headers,
      'Api-Key': FORUM_API_KEY
    }
    return super.request(method, path, params, config)
  }

  async create(post: Post): Promise<string> {
    const response: CreateSuccess | CreateError = await this.request('post', '/posts.json', post)
    if (response.errors !== undefined) {
      throw new Error(`Error creating the post ${JSON.stringify(post)}: ${response.errors.join(', ')}`)
    }
    const { id, topic_slug } = response as CreateSuccess
    return `${FORUM_URL}/t/${topic_slug}/${id}`
  }
}

export const forum = new ForumAPI(FORUM_URL)
