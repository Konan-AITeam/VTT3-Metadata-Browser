# (주)코난테크놀로지 VTT 클라이언트

비디오 등록 관리 및, 비디오 Shot 을 관리하는 페이지 입니다.
비디오 메타데이터 검증용 브라우저 

## vue-electron 기반 비디오 메타데이터 브라우저

### 사용 방법 
1. PC에서 데이터셋을 지정된 폴더 및 위치에 놓는다.
- 형식 
    1) 동영상 ID : {dataset_root_path}/video/2021/1/1/* , {dataset_root_path}/proxyshot/2021/1/1/*
    2) 동영상 파일
        - {dataset_root_path}/video/2021/1/1/*/.mp4 (다양한 비디오 파일 형식)
    3) 프레임 이미지 파일
        - {dataset_root_path}/proxyshot/2021/1/1/*/SCENE_0000000000/SHOT_*/*.jpg
    4) JSON 파일
        - {dataset_root_path}/proxyshot/2021/1/1/*/SCENE_0000000000/SHOT_*/*.json 
    5) 통계 파일
        - 전체 동영상 통계 파일 : {dataset_root_path}/statistics.json 
        - 개별 동영상 통계 파일 : {dataset_root_path}/proxyshot/2021/1/1/*/statistics.json 

2. PC환경에 따라 메타데이터 브라우저를 각각 설치한다.
  - MAC : dmg파일 실행하고 application으로 이동하여 응용프로그램에 설치된다.
  - Window : setup.zip을 풀고 exe파일 실행하면 
    C:\Users\{로그인계정}\AppData\Local\Programs\vtt-metadatabrowser-2021에 설치되고 
    바탕화면에 바로가기가 생성된다. 

3. 바탕화면에서 “vtt-metadatabrower-2021” 실행하여 메타데이터 브라우저에서 동영상의 메타데이터를 확인 및 검증할 수 있다.

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run electron:serve
```

#### Compiles and minifies for production
```
npm run electron:build
```

#### Lints and fixes files
``` bash
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
