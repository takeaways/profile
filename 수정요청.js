function godoFix(sendingData, whois){
  const return_head = (len) => `
  <div id="godoTitle" style="border:1px solid blue; border-radius:5px;">
    [수정요청]고도몰 가맹점 네이버페이 수정 요청드립니다. ( ${len} )건
  </div>
    <div id="mail_form" style="border:1px solid black; border-radius:5px; margin-top: 10px; padding-left:5px;margin-bottom:100px;background-color: rgb(255, 255, 255);">
      <div style="font-size:13px; font-family:Gulim,굴림,sans-serif;">
        <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">안녕하세요. 네이버페이 ${whois}입니다.^^</span></div>
        <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">금일(${sendingData[0].date}) 최종승인 요청주신 가맹점에서 네이버페이 연동 수정사항이 확인되어 안내 드립니다.</span></div>
        <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">​</span></div>
    `

  const return_footer = () => `
          <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">​</span></div>
          <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">​</span></div>
          <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">수정이 완료되면 회신 부탁드립니다.^^</span></div>
          <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">감사합니다.</span></div>
          <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">​</span></div>
          <br style="color: rgb(0, 0, 0); font-family: Gulim, 굴림, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); box-sizing: border-box;">
          <br
            style="color: rgb(0, 0, 0); font-family: Gulim, 굴림, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); box-sizing: border-box;">
            <div style="font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); box-sizing: border-box; line-height: 12px;"><span style="box-sizing: border-box; font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(152, 152, 152);"><span style="font-family: NanumGothic, 나눔고딕, sans-serif;">이 메일은 나눔글꼴로 작성되었습니다.&nbsp;&nbsp;</span>
              <span style="font-family: NanumGothic, 나눔고딕, sans-serif;">&nbsp;</span>
              </span><a href="http://hangeul.naver.com/" target="_blank" style="cursor: pointer; text-decoration: underline; background-color: transparent; box-sizing: border-box; color: rgb(67, 153, 226); font-size: 12px; font-style: normal; font-weight: 400; font-family: nanumgothic, 나눔고딕, sans-serif;"
                rel="noreferrer noopener">설치하기</a><span style="font-size: 12px; font-family: NanumGothic, 나눔고딕, sans-serif; font-style: normal; font-weight: 400; color: rgb(0, 0, 0);">&nbsp;</span><br style="box-sizing: border-box;"><span style="box-sizing: border-box; font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(152, 152, 152);">&nbsp;</span></div>
            <img width="200" height="1" src="http://static.navercorp.com/static/site/connect2/user/connect/img/bar_1_v2.gif" style="border: 0px currentcolor; color: rgb(0, 0, 0); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; background-color: rgb(255, 255, 255);">
            <div style="font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); line-height: 16px;"><strong style="color: rgb(54, 54, 54); letter-spacing: -1px; font-size: 12px; font-style: normal; font-family: 나눔고딕, NanumGothic, 돋움, dotum, 굴림, Gulim, AppleGothic, sans-serif;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif;">${whois}</span></strong>
              <span style="color: rgb(54, 54, 54); font-size: 12px; font-family: NanumGothic, 나눔고딕, sans-serif; font-style: normal; font-weight: 400;">&nbsp;${ whois ==="장건일" ? "Geonil Jang" : "Hyewon Lee"}</span><br>
              <div><br><span style="color: rgb(153, 153, 153); font-family: tahoma; font-size: 11px; font-style: normal; font-weight: 400;"><strong style="color: rgb(136, 136, 136); font-weight: bold;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif;">Email&nbsp;</span></span>
                </strong><span style="color: rgb(153, 153, 153); font-size: 12px; font-family: NanumGothic, 나눔고딕, sans-serif;"><a href="mailto:${whois === "장건일" ? "geonil.jang@navercorp.com" : "hye.won-lee@navercorp.com"}" target="_blank" style="text-decoration: none; background-color: transparent; cursor: pointer; color: rgb(153, 153, 153);" rel="noreferrer noopener">${whois === "장건일" ? "geonil.jang@navercorp.com" : "hye.won-lee@navercorp.com"}</a>​</span></span>
              </div>
            </div>
        </div>
      </div>
  `

  const line_maker = (item) => {
  const error_line = item.replace(/"/gi,"").replace(/</gi,"&lt;").replace(/>/gi,"&gt;");
  const contents = error_line.split("\n\n");
  const filtered_contents = contents.map(row => row.split("\n"));
  const filtered_text = filtered_contents.map(row => row.join("<br/>"));
  const filtered_text_html = filtered_text.join("<br/><br/>");
  return filtered_text_html
  }

  const error_conunt = (items) => {
  return `<div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold; color: rgb(255, 152, 0);">안내드린 ${items.join(" / ")} 가맹점( ${items.length}건 )은 금일 중 수정이 어려우신 경우, 네이버페이 버튼 비노출 요청 드립니다.</span></div>`
  }

  const item_maker = (sendingData) => {

  // const before_items = godoText.filter(row => {if(row.split("\t").length > 1) return true;else false;});
  // const filtered_items = before_items.map(row => row.split("\t"));
  let errors = [];
  let opens = [];
  sendingData.forEach(item => {if(item.state === "연동오류") errors.push(item);else if(item.state === "정상오픈") opens.push(item);});
//  const errors_count = errors.length


  const errors_text = errors.map((error, index) => `
      <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold; color: rgb(255, 0, 0);">${index+1}. ${error.shop_name}( ${error.shop_url} ) &nbsp;</span></div>
      <div style="margin-left: 20px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">${line_maker(error.fix)}</span></div>
      <div style="margin-left: 20px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold;">​</span></div>
    `).join("");



  const opens_text = opens.map((open, index) => `
      <div style="margin-left: 20px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold;">​</span></div>
      <div><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold; color: rgb(0, 123, 217);">${index+errors.length+1}. ${open.shop_name}( ${open.shop_url} ) &nbsp;</span></div>
      <div style="margin-left: 20px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">${line_maker(open.fix)}</span></div>
      <div style="margin-left: 20px;"><span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px; font-weight: bold;">​</span></div>
    `).join("");
  return errors_text + ( errors.length !== 0 ? error_conunt(errors.map(e=>e.shop_name)) : "" ) + opens_text
  }


  return `
      ${return_head(sendingData.length)}
      ${item_maker(sendingData)}
      ${return_footer()}
    `



}
