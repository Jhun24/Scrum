# Scrum

# Font

## Google Font : Ubuntu

# Img

## background.jpg : 1920px * 1080px

# Node Module

## mongoose
## body-parser
## express
## express-session

## 제작자는 supervisor를 사용했습니다

#Schema

# User

## name : User's name
## id : User's id
## ps : User's password

# scrum

## id : User's id
## header : scrum의 title
## date : scrum의 date
## content : scrum의 content
## setPlace : scurm view 위치 : Todo, Doing, Done
## setNum : 스크럼 순서

# Javascripts && css

## login,register는 둘 다 login.css를 참조합니다

# GET

# /
## 로그인으로 이동
## No data

# /register
## 회원가입으로 이동
## No data

# /scrumAdd
## 스크럼 추가로 이동
## No data

# /scrum
##스크럼 view로 이동
##No data

#POST

# /addId
## 회원 정보를 db에 추가
## data{"name":data , "id":data , "ps":data}
## 세션에 userId를 넘겨줍니다
## 회원가입 성공시 0을 반환합니다.

# /login
## 로그인
## data{"id":data , "ps":data}
## 세션에 userId를 넘겨줍니다
## 로그인 성공시 0을 반환합니다.
## DB에 일치하는 id가 없다면 1을 반환합니다

# /addScrum
## 스크럼 추가
## {"id":data,"header":data,"date":data,"content":data,"setPlace":data,"setNum":data}
##session에서 userId를 받아옵니다
## Scrum이 DB에 추가되면 0을 반환합니다
## DB에 저장 실패시 1을 반환합니다

# /sessionIdCheck
## 세션에 userId가 있는지 확인합니다
## No data
## session에서 userId를 받아옵니다
## userId가 존재하면 0을 반환합니다
## userId가 없다면 1을 반환합니다

# /scrumList
## 사용자의 스크럼 목록을 반환합니다
## No data
## session의 userId를 받아옵니다
## 조회 성공시 scrumList model을 반환합니다
## 조회 실패시  1을 반환합니다

# /changeSetPlace
## scrum의 위치를 변환합니다
## data{"setNum":data}
## scrum의 setPlace를 value로 변환합니다
## session을 사용하지 안습니다
## 무조건 0을 반환합니다

# DB

## git fetch하고 현재 폴더에 data 폴더를 생성해 주세요
