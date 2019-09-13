import { message } from 'antd';

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = email => re.test(String(email).toLowerCase());

export const getBase64 = img => {
  const reader = new FileReader();
  return new Promise(resolve => {
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
};

export const beforeUpload = file => {
  const idValidType = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!idValidType) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return idValidType && isLt2M;
};
