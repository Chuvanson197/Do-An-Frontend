// import axios from 'axios';

const service = {
  getProjectList: () => {
    // dummy data
    return [
      {
        id: 1,
        name: 'MUJI-ADMIN',
        customer: 'MUJI.jp',
        start_time: 1568626107000,
        end_time: 1600248507000,
        status: 'running'
      },
      {
        id: 2,
        name: 'Project-Management',
        customer: 'Impl.vn',
        start_time: 1568626107000,
        end_time: 1600248507000,
        status: 'stopped'
      },
      {
        id: 3,
        name: 'Xaydung.co',
        customer: 'Tekmate.co',
        start_time: 1537256897000,
        end_time: 1563436097000,
        status: 'completed'
      },
      {
        id: 4,
        name: 'Epark',
        customer: 'EPARK.jp',
        start_time: 1568626107000,
        end_time: 1600248507000,
        status: 'running'
      }
    ];
    // axios.get(`https://api.github.com/users/${username}/repos`).then((res) => res.data)
  }
};

export default service;
