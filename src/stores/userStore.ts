import { client } from '@/services/apollo-client'
import { FIND_ONE_USER, FIND_MANY_TAG } from '@/services/query/user'
import { LOGIN, USER_REGISTER } from '@/services/mutation/user'
import { FetchResult } from '@apollo/client'
import { OnboardingInfo, User, Tag } from '@/types/user'
import { cookie } from '@/services/storage'

export type UserStore = {
  onboardingInfo: OnboardingInfo; // TODO: type 변경 예정
  user: null | User;
  tags: number[];
  setUser: (payload: User) => void
  setTags: (payload: Tag[]) => void
  initOnboardingInfo: () => void;
  // TODO: 타입 정교화
  login: (payload: string) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
  setOnboardingInfo: (info: Record<string, string | number[]>) => void;
  getTags: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
  register: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
  getUser: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
  logout: () => void
}

export const userStore = (): UserStore => {
  const store: UserStore = {
    onboardingInfo: {
      googleIdToken: '',
      originJob: '',
      interestJob: '',
      tags: [],
      work: '',
      company: ''
    },
    user: null,
    tags: [],
    setUser (user: User) {
      this.user = user
    },
    setTags (tags: Tag[]) {
      this.tags = tags.map(tag => tag.id)
    },
    initOnboardingInfo () {
      this.onboardingInfo = {
        googleIdToken: '',
        originJob: '',
        interestJob: '',
        tags: [],
        work: '',
        company: ''
      }
    },
    async login (googleId: string) {
      this.onboardingInfo.googleIdToken = googleId
      return new Promise((resolve, reject) => {
        client.mutate({
          mutation: LOGIN,
          variables: {
            googleIdToken: this.onboardingInfo.googleIdToken
          }
        }).then((result) => {
          this.initOnboardingInfo()
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    setOnboardingInfo (info: Record<string, string | number[]>) {
      this.onboardingInfo = Object.assign(this.onboardingInfo, info)
    },
    async getTags () {
      return new Promise((resolve, reject) => {
        client.query({
          query: FIND_MANY_TAG
        }).then((result) => {
          this.setTags(result.data.findManyTag)
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    async register () {
      return new Promise((resolve, reject) => {
        client.mutate({
          mutation: USER_REGISTER,
          variables: this.onboardingInfo
        }).then((result) => {
          this.setUser(result.data.userRegister)
          this.initOnboardingInfo()
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    async getUser (userId?: number) {
      return new Promise((resolve, reject) => {
        client.query({
          query: FIND_ONE_USER,
          variables: {
            userId: userId || null
          }
        }).then((result) => {
          this.setUser(result.data.findOneUser)
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    logout () {
      const cookieKeys = document.cookie.split(' ').map(cookie => cookie.split('=')[0])
      // TODO: domain
      cookieKeys.forEach(key => cookie.deleteCookie(key, '/', 'localhost'))
      this.user = null
    }
  }
  return store
}
