import request from '@utils/request';
import { StorageServices } from './storage';

const objectNotification = {
  body: {
    content: "Publicidad",
    created: "2020-08-19T19:58:18.943Z",
    id: "70b46673-f084-48f2-b840-64c0393af48e",
    lastUpdated: "2020-08-19T19:58:18.943Z",
    link: "www.google.com",
    phone: "+44112541564",
    postTypeId: "c1ff8567-e0ba-11ea-a087-0e17acad58be",
    societyId: "fafc7359-0139-43d7-9d00-1828d90cc407",
    status: true,
    title: "Publicidad",
    userId: "5d32353e-67c9-4ab1-9484-b200d0fefa79"
  },
  date: "2020-08-19T19:58:18.943Z",
  key: "notification",
  method: "POST",
  source: "Post"
}

export class NotificationServices extends StorageServices {

  constructor() {
    super()
  }

  getFilterUsers() {
    return JSON.stringify({
      fields: {
        id: true,
        firstName: true,
        lastName: true
      },
      include: [
        {
          relation: 'fileStorages',
          scope: {
            where: {
              tag: 'profile'
            },
            fields: {
              link: true,
              userId: true
            }
          }
        }
      ]
    })
  }

  buildNotification(dataUser, dataPost, notification) {
    return {
      image: dataUser.fileStorages ? dataUser.fileStorages[0].link : 'https://via.placeholder.com/150x150',
      title: `${dataUser.firstName} ${dataUser.lastName}`,
      type: dataPost.name,
      created: notification.date,
      notification
    }
  }

  async getDetailUser(userId, filter) {
    const url = `${process.env.URL_API}/users/${userId}${filter ? '/?filter=' + filter : ''}`
    const options = this.getOptions()
    return await request(url, options)
  }

  async getDetailPostTypes(postTypeId, filter) {
    const url = `${process.env.URL_API}/post-types/${postTypeId}${filter ? '/?filter=' + filter : ''}`
    const options = this.getOptions()
    return await request(url, options)
  }

  async getNotification(objectNotification) {
    console.log(objectNotification)
    let newNotification = {};
    const { body: { userId, postTypeId, societyId } } = objectNotification
    const auth = this.getStorage('auth')
    try {
      if (societyId === auth.societyId) {
        const dataUser = await this.getDetailUser(userId, this.getFilterUsers())
        const dataPost = await this.getDetailPostTypes(postTypeId)
        newNotification = this.buildNotification(dataUser, dataPost, objectNotification)
      }
      return newNotification
    } catch (e) {
      console.log(e)
      return {}
    }
  }

}

const Notification = new NotificationServices();
export default Notification;