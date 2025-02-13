import ApiClient from '@/services/ApiClient';

import config from '@/config/index';

import JuicesService from '@/services/JuicesService';

const apiClient = new ApiClient({ ...config.api.backend });

const juicesService = new JuicesService(apiClient);

export {
  apiClient,
  juicesService
}