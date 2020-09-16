



1. DB Migrate 사용법 

1) 설치 
  npm install -db-migrate -g  //db-migrate 명령어 시 프로젝트에서부터 찾음
  npm install db-migrate, db-migrate-mysql 

2) 구성 파일 생성 
 database.json 파일 샘플은 db-migrate 사이트에 있음(https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/)
 {
  "dev": {
    "host": "localhost",
    "user": { "ENV" : "DB_USER" },   //"ENV" value 값은 process.env에서 매칭시킨다. 
    "password" : { "ENV" : "DB_PASS" },
    "database": "database-name",
    "driver": "mysql",
    "multipleStatements": true
  }
}
 
3) 마이그레이션 생성 
    db-migrate create test 
    migrations/yyyyMMddHHmmss-test.js (시간은 utc 기준인듯함)

4) 해당 파일 내 up/down 작성
    callback function || promise 패턴으로 작성 가능하다

5) 적용
    db-migrate up / down     