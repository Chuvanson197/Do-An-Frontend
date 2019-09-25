// import axios from 'axios';

const service = {
  getProjectDetail: () => {
    // dummy data
    return {
      name: 'MUJI-ADMIN',
      customer_name: 'MUJI.jp',
      total_member: 5,
      start_date: 1568626107000,
      end_date: 1600248507000,
      members: [
        {
          staff_code: 'A123',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '1',
          join_at: 1568626107000
        },
        {
          staff_code: 'A124',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '2',
          join_at: 1568626107000
        },
        {
          staff_code: 'A125',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '3',
          join_at: 1568626107000
        },
        {
          staff_code: 'A126',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '4',
          join_at: 1568626107000
        },
        {
          staff_code: 'A127',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '5',
          join_at: 1568626107000
        }
      ],
      service_detail: {
        home_page: 'https://homepage.abc.com.vn',
        details:
          'abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc',
        folder_link: 'https://driver.folder.com.vn',
        admin_page: 'https://admin.abc.com.vn'
      }
    };
    // axios.get(`https://api.github.com/users/${username}/repos`).then((res) => res.data)
  }
};

export default service;
