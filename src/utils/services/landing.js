import { StorageServices } from "./storage";

export class LandingServices extends StorageServices {
  constructor() {
    super();
  }

  async getLinks() {
    const { societyId } = this.getStorage('auth')
    try {
      return await this.getFetchEndpoint(`societies/${societyId}/third-party-links`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getQuotePlan() {
    const { societyId } = this.getStorage('auth')
    try {
      return await this.getFetchEndpoint(`societies/${societyId}/quote-plans`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  /**
   * Services Landing Page
   */

  async getSociety() {
    const hostname = `localhost`;
    const filter = {
      include: [
        {
          relation: 'mainPicture'
        }
      ]
    }
    try {
      this.resetFilter()
      this.setFilterEndpoint(filter)
      return await this.getFetchEndpoint(`society/${hostname}`);
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  async getBlog() {
    const filter = {
      fields: {
        id: true,
        postTypeId: true,
        title: true,
        content: true,
        societyId: true,
      },
      include: [
        {
          relation: 'postType',
          scope: {
            fields: {
              id: true,
            },
            where: {
              name: 'blog',
            },
          },
        },
        {
          relation: 'fileStorages',
          scope: {
            fields: {
              id: true,
              link: true,
              postId: true,
            },
          },
        },
      ],
    }
    try {
      this.resetFilter()
      this.setFilterEndpoint(filter)
      this.setFormatNestedTo('postType')
      this.setFilterOrder('created', 'DESC')
      return await this.getFetchEndpoint(`posts`);
    } catch (e) {
      console.log(e);
      return mockBlogs;
    }
  }

  async getLinks({ societyId }) {
    try {
      this.resetFilter()
      return await this.getFetchEndpoint(`societies/${societyId}/third-party-links`);
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  async getQuotePlan({ societyId }) {
    const filter = {
      where: {
        societyId,
      },
    }
    try {
      this.resetFilter()
      this.setFilterEndpoint(filter)
      return await this.getFetchEndpoint(`quote-plans`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getServices() {
    const filter = {
      where: {
        status: true,
      },
      fields: {
        id: true,
        societyId: true,
        serviceId: true,
      },
      include: [
        {
          relation: 'service',
          scope: {
            fields: {
              id: true,
              name: true,
              description: true,
              price: true,
              path: true,
              icon: true
            },
          },
        },
      ],
    }
    try {
      this.resetFilter()
      this.setFilterEndpoint(filter)
      this.setFormatNestedTo('service')
      return await this.getFetchEndpoint(`acquires`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

