import axios from 'axios';

const service = {
  getProjectDetail: (body) => {
    // dummy data
    return {
      customer_name: 'Customer A',
      total_member: 1,
      start_date: '2019/09/01',
      end_date: '2019/09/30',
      members: [
        {
          staff_code: 'A123',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '0.9',
          join_at: '2019/09/10'
        },
        {
          staff_code: 'A124',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '0.9',
          join_at: '2019/09/10'
        },
        {
          staff_code: 'A125',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '0.9',
          join_at: '2019/09/10'
        },
        {
          staff_code: 'A126',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '0.9',
          join_at: '2019/09/10'
        },
        {
          staff_code: 'A127',
          name: 'Nguyen Van A',
          position: 'Developer',
          effort: '0.9',
          join_at: '2019/09/10'
        }
      ]
    };
    // axios.get(`https://api.github.com/users/${username}/repos`).then((res) => res.data)
  }
};

export default service;
