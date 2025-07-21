import axios from 'axios';

const commonApi = async (reqUrl, reqMethod, reqHeader = { 'Content-Type': 'application/json' }, reqBody) => {
  const config = {
    url: reqUrl,
    method: reqMethod,
    headers: reqHeader,
    data: reqBody,
  };

  return await axios(config);
};

export default commonApi;
