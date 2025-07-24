import axios from 'axios';

const commonApi = async (
  reqUrl,
  reqMethod,
  reqHeaders = null,
  reqBody = null
) => {
  const config = {
    url: reqUrl,
    method: reqMethod,
  };

  // Only set headers if provided (don't force default)
  if (reqHeaders) {
    config.headers = reqHeaders;
  }

  // Attach body if present
  if (reqBody) {
    config.data = reqBody;
  }

  const response = await axios(config);
  return response;
};

export default commonApi;
