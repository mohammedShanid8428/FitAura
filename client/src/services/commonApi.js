import axios from 'axios';

const commonApi = async (reqUrl, reqMethod, reqHeaders = { 'Content-Type': 'application/json' }, reqBody = null) => {
  const config = {
    url: reqUrl,
    method: reqMethod,
    headers: reqHeaders
  };

  if (reqBody) {
    config.data = reqBody;
  }

  const response = await axios(config);
  return response;
};

export default commonApi;
