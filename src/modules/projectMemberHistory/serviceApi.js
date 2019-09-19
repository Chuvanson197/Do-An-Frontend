// import axios from 'axios';

const service = {
  getProjectMemberHistory: () => {
    // dummy data
    return [
      {
        id: 'member_001',
        staff_code: 'impl_S01',
        name: 'Nguyễn Xuân An',
        phonenumber: '0975352786',
        email: 'an.nguyen@impl.vn',
        time_in: 1568271275000,
        time_out: 1599893675000,
        status: 'working',
        effort: 1,
        position: 'Developer'
      },
      {
        id: 'member_002',
        staff_code: 'impl_S02',
        name: 'Nguyễn Xuân An',
        phonenumber: '0975352786',
        email: 'an.nguyen@impl.vn',
        time_in: 1568271275000,
        time_out: 1599893675000,
        status: 'out',
        effort: 1,
        position: 'Developer'
      },
      {
        id: 'member_003',
        staff_code: 'impl_S03',
        name: 'Nguyễn Xuân An',
        phonenumber: '0975352786',
        email: 'an.nguyen@impl.vn',
        time_in: 1568271275000,
        time_out: 1599893675000,
        status: 'busy',
        effort: 1,
        position: 'Developer'
      }
    ];
    // axios.get(`https://api.github.com/users/${username}/repos`).then((res) => res.data)
  }
};

export default service;
