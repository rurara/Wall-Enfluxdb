# WALL-ENFLUXDB
javascript로 INFLUX DB에 데이터를 보냅니다.


### 설치
<code>
npm install Wall-Enfluxdb --save
</code>


### 사용 전 세팅
test ── index.js  // 5
     └─ test.js   // 5 
<code>
const WallE = new Wallenfluxdb(
  "INFLUX DB 토큰",
	"http://접속 주소:8086",
	"소속 단체",
	"INFLUX DB BUCKET",
	"시간 단위(예:ms, ns)")
</code>


### 테스트
<code>
npm test
</code>

### history
0.1.3 (commit 7ce857f)
- 파일 경로 수정
- 프로미스 패턴 추가

