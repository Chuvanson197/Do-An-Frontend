# Project Management

Web quản lý dự án, thông tin khách hàng, thông tin thành viên nội bộ công ty

## Cài đặt và khởi chạy dự án

### Cài đặt môi trường
- mysql server v8.0.17
- nodejs v10.16.0

### Cài đặt dự án

#### Clone project back-end

- Clone với HTTPS:

```
git clone https://gitlab.impl.vn/inhouse-service/api-project-management.git
```

- Clone với SSH

```
git clone git@gitlab.impl.vn:inhouse-service/api-project-management.git
```

#### Clone project front-end

- Clone với HTTPS:

```
git clone https://gitlab.impl.vn/inhouse-service/project-management.git
```

- Clone với SSH

```
git clone git@gitlab.impl.vn:inhouse-service/project-management.git
```
#### Chạy project back-end

- Chạy mysql script 

- Cài đặt node modules

```
npm install
```

- Khởi động project

```
npm start
```

nếu sử dụng nodemon

```
npx nodemon
```
#### Chạy project front-end
- Cài đặt node modules

```
npm install
```

- Khởi động project

```
npm start
```

## yêu cầu về quy trình trên github

- checkout từ nhánh develop và tạo pull request sau khi hoàn thành công việc
- đặt tên các nhánh theo chuẩn sau: develop_/[mã số ticket/loại công việc]_[tên nhánh]
  vd: develop_/01_create_dashboard
      develop_/fixbug_login_screen


