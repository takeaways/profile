## 리액트, 넥스트, 리덕스, 리덕스 사가, express를 이용한 프로젝트 입니다.
## useCallback : props로 넘어 가는 함수는 감싸줘야 한다! 렌더링을 다시 하기 때문에 의도 하지 않은 리렌더링 방지를 위해서
## redux
<pre>
<code>
  흩어져있는 state를 하나로 통합 관리 하기 위해서 사용
  안정성, state 통제 용이

  store ={state action reducer}
  action -> state 를 바꾸는 행동
  dispatch -> Action을 실행
  reducer -> Action의 결과로 state를 어떻게 바꿀지



  connect(mapState)(Component)
  const connect = (mapState) => (Component) => () =>{
    return(
        <Component props={mapState}/>
      )
  }

  hoc(Component)
  const hoc = (Component) => () => {
    return <Component hello="I am users"/>
  }
</code>
</pre>
## redux-saga
<pre>
<code>
  리덕스 사가의 필요성 : 비동기 처리에서 나온다!
  리덕스 기능을 확장하기 위해 미들웨어!

  제너레이터 문법을 사용합니다.
  무한의 개념, 비동기 처리 할 때 많이 사용합니다.
</code>
</pre>

##back setting
<pre>
<code>
  HTTP 요청 주소 체계
  fron (요청) < ----- > back (응답)
  수백가지의 종류가 너무 많기 떄문에 약소을 잘 정해서 사용
  [ REST API >  GRAPH QL > soap.. ] 
</code>
</pre>
