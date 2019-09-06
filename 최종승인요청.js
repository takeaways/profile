
const makeHTML = ({godoData}, whois) => {
//shop_id, shop_name, name, host, url
  const mail_godo_permission = (data) => {
    let quotient = parseInt(data.length / 3);
    let inter = (data.length % 3);
    const user_array =[];

    switch (inter) {
      case 0:
        for(let i = 0 ; i < quotient ; i++){user_array.push("이민석");}
        for(let i = 0 ; i < quotient ; i++){user_array.push("이혜원");}
        for(let i = 0 ; i < quotient ; i++){user_array.push("장건일");}
        break;
      case 1:
        for(let i = 0 ; i < quotient ; i++){user_array.push("이민석");}
        for(let i = 0 ; i < quotient ; i++){user_array.push("이혜원");}
        for(let i = 0 ; i < quotient+1 ; i++){user_array.push("장건일");}
        break;
      case 2:
        for(let i = 0 ; i < quotient ; i++){user_array.push("이민석");}
        for(let i = 0 ; i < quotient+1 ; i++){user_array.push("이혜원");}
        for(let i = 0 ; i < quotient+1 ; i++){user_array.push("장건일");}
        break;
      // case 3:
      //   for(let i = 0 ; i < quotient+1 ; i++){user_array.push("이민석");}
      //   for(let i = 0 ; i < quotient+1 ; i++){user_array.push("김지민");}
      //   for(let i = 0 ; i < quotient ; i++){user_array.push("이혜원");}
      //   for(let i = 0 ; i < quotient+1 ; i++){user_array.push("장건일");}
      //   break;
      default:
    }
    return user_array
  }

const trMaker = (shop_id, shop_name, name, host, url) => {
  const tempTr = `
  <tr height="16" style="height: 12.0pt;">
    <td height="16" width="117" style="height: 12pt; width: 88pt; border: 0.5pt solid windowtext; background: ${name === "이민석" ? "rgb(198, 224, 180)" : name === "김지민" ? "rgb(255, 230, 153)" : name === "이혜원" ? "rgb(248, 203, 173)" : name === "장건일" ? "rgb(180, 198, 231)" : "" }; text-align: center; white-space: normal; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle;"><span
        style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; text-decoration: none; color: black;">${shop_id}</span></td>
    <td width="205" style="width: 154pt; border: 0.5pt solid windowtext; background: ${name === "이민석" ? "rgb(198, 224, 180)" : name === "김지민" ? "rgb(255, 230, 153)" : name === "이혜원" ? "rgb(248, 203, 173)" : name === "장건일" ? "rgb(180, 198, 231)" : "" }; text-align: center; white-space: normal; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle;"><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; text-decoration: none; color: black;">${shop_name}</span></td>
    <td width="53" style="width: 40pt; border: 0.5pt solid windowtext; background:${name === "이민석" ? "rgb(198, 224, 180)" : name === "김지민" ? "rgb(255, 230, 153)" : name === "이혜원" ? "rgb(248, 203, 173)" : name === "장건일" ? "rgb(180, 198, 231)" : "" }; text-align: center; white-space: normal; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle;"><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; text-decoration: none; color: black;">${name}</span></td>
    <td width="50" style="width: 38pt; border: 0.5pt solid windowtext; background: ${name === "이민석" ? "rgb(198, 224, 180)" : name === "김지민" ? "rgb(255, 230, 153)" : name === "이혜원" ? "rgb(248, 203, 173)" : name === "장건일" ? "rgb(180, 198, 231)" : "" }; text-align: center; white-space: normal; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle;"><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; text-decoration: none; color: black;">${host}</span></td>
    <td width="258" style="width: 194pt; border: 0.5pt solid windowtext; background: ${name === "이민석" ? "rgb(198, 224, 180)" : name === "김지민" ? "rgb(255, 230, 153)" : name === "이혜원" ? "rgb(248, 203, 173)" : name === "장건일" ? "rgb(180, 198, 231)" : "" }; text-align: center; white-space: normal; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle;"><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; text-decoration: none; color: black;">${url}</span></td>
  </tr>
  `
  return tempTr
}


const mail_templet_permission = (filtered_content, len) =>{
  const date = new Date();
  const month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
  return `
  <div id="godoTitle" style="border:1px solid blue; border-radius:5px;">
    [공유] ${month}월 ${day}일 고도몰 최종승인 부탁드립니다.
  </div>
  <div id="mail_form" style="border:1px solid black; border-radius:5px; margin-top: 10px; padding-left:5px;margin-bottom:100px;background-color: rgb(255, 255, 255);">
    <div style="margin-bottom:10px;">
      <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">안녕하세요. ${whois}입니다.</span>
    </div>

    <div style="margin-bottom:10px;">
      <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">${month}월 ${day}일 고도몰 최종승인 부탁드립니다. ${len}</span>
    </div>


    <div style="margin-bottom:10px;">
      <p style="margin: 0px;margin-bottom:10px;   padding: 0px; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">
        <span style="font-size: 12px; font-style: normal; font-weight: bold; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 191, 22);">* 금일오픈가맹점</span>
      </p>
      <table border="0" cellpadding="0" cellspacing="0" width="683" style="border-collapse: collapse;width: 514pt;">
        <colgroup>
          <col width="117" style="width: 88pt;">
          <col width="205" style="width: 154pt;">
          <col width="53" style="width: 40pt;">
          <col width="50" style="width: 38pt;">
          <col width="258" style="width: 194pt;">
        </colgroup>
        <tbody>
        <tr height="16" style="height: 12.0pt;">
          <td height="16" width="117" style="height: 12pt; width: 88pt; text-align: center; background: black; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle; border: none; white-space: nowrap;">
            <span style="font-size: 9pt; font-style: normal; font-weight: 700; font-family: 나눔고딕, monospace; text-decoration: none; color: yellow;">가맹점ID</span>
          </td>
          <td width="205" style="width: 154pt; text-align: center; background: black; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle; border: none; white-space: nowrap;">
            <span style="font-size: 9pt; font-style: normal; font-weight: 700; font-family: 나눔고딕, monospace; text-decoration: none; color: yellow;">가맹점명</span>
          </td>
          <td width="53" style="width: 40pt; text-align: center; background: black; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle; border: none; white-space: nowrap;">
            <span style="font-size: 9pt; font-style: normal; font-weight: 700; font-family: 나눔고딕, monospace; text-decoration: none; color: white;">담당자</span>
          </td>
          <td width="50" style="width: 38pt; text-align: center; background: rgb(192, 0, 0); padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle; border: none; white-space: nowrap;">
            <span style="font-size: 9pt; font-style: normal; font-weight: 700; font-family: 나눔고딕, monospace; text-decoration: none; color: white;">호스팅사</span>
          </td>
          <td width="258" style="width: 194pt; text-align: center; background: black; padding-top: 1px; padding-right: 1px; padding-left: 1px; vertical-align: middle; border: none; white-space: nowrap;">
            <span style="font-size: 9pt; font-style: normal; font-weight: 700; font-family: 나눔고딕, monospace; text-decoration: none; color: yellow;">사이트URL</span>
          </td>
        </tr>
        ${
          filtered_content.map(  content  => {
              const {shop_id, shop_name, shop_url, solution, name} = content
              return trMaker(shop_id, shop_name, name, solution, shop_url)
            }
          ).join("")
        }
        </tbody>
      </table>
    </div>

    <div style="font-size:12px; font-family:NanumGothic,나눔고딕,sans-serif;">
      <span style="font-weight: bold; font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">* 방법</span>
      <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">: 정보관리-</span>
      <span style="text-decoration-line: underline; font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">상품정보</span>
      <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;"> 확인/등록 및 PG정보 '정상' 확인, 계좌정보 확인 → 가입진행-상품연동/결제연동 → 연동완료-최종승인 →&nbsp; 아이콘/모바일 연동</span><br>
    </div>
    <br>
    <div style="font-size:12px; font-family:NanumGothic,나눔고딕,sans-serif;">
      <div style="font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;"><span
          style="font-weight: bold; font-size: 12px; font-style: normal; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">* 상품정보 등록시</span><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">:
          고도몰5 는
          2.1v으로 연동되어 있어 'Y'로 변경.</span><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">&nbsp;</span><span style="font-weight: bold; font-size: 12px; font-style: normal; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">고도몰5
          =&nbsp;</span><span style="font-weight: bold; font-size: 12px; font-style: normal; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">/partner/naverpay_goods_link.php</span></div>
      <div style="font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; margin-left: 100px;"><span
          style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">고도몰은 1.0v으로
          연동되어 있어 'N'으로 진행.</span><span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">&nbsp;</span><span style="font-weight: bold; font-size: 12px; font-style: normal; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">고도몰
          =&nbsp;</span><span style="font-weight: bold; font-size: 12px; font-style: normal; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(0, 0, 0);">/shop/partner/naverCheckout.php</span></div><br>
      <div style="font-size:12px; font-family:NanumGothic,나눔고딕,sans-serif;">
        <div style="font-size:12px; font-family:NanumGothic,나눔고딕,sans-serif;">
          <div>
            <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">감사합니다.</span><br><br>
            <div style="line-height: 12px;">
              <span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(152, 152, 152);">
                이 메일은 나눔글꼴로 작성되었습니다.&nbsp;&nbsp;
              </span>
              <a href="http://hangeul.naver.com/" target="_blank" style="cursor: pointer; color: rgb(67, 153, 226); text-decoration: underline; font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif;">설치하기</a>
              <br>
              <span style="font-size: 12px; font-style: normal; font-weight: 400; font-family: NanumGothic, 나눔고딕, sans-serif; color: rgb(152, 152, 152);">&nbsp;</span>
            </div>
            <img width="200" height="1" style="border: 0px currentColor; border-image: none; margin-bottom: 15px; vertical-align: middle;" src="http://static.navercorp.com/static/site/connect2/user/connect/img/bar_1_v2.gif">
            <div style="line-height: 16px; font-family: '나눔고딕',NanumGothic,'돋움',dotum,'굴림',Gulim,AppleGothic,sans-serif;">
              <strong style="color: rgb(54, 54, 54); letter-spacing: -1px; font-size: 12px;">
                <span style="font-family: NanumGothic, 나눔고딕, sans-serif;">${whois}</span>
              </strong>${ whois ==="장건일" ? "Geonil Jang" : "Hyewon Lee"}</span><br>
              <div style="color: rgb(137, 137, 137);">
                <br>
                <span style="color: rgb(153, 153, 153); font-family: tahoma; font-size: 11px;">
                  <strong style="color: rgb(136, 136, 136); font-weight: bold;">
                    <span style="font-family: NanumGothic, 나눔고딕, sans-serif; font-size: 12px;">Email </span>
                  </strong>
                  <span style="color: rgb(153, 153, 153); font-size: 12px; font-family: NanumGothic, 나눔고딕, sans-serif;">
                    <a style="color: rgb(153, 153, 153); text-decoration: none;" href="mailto:${whois === "장건일" ? "geonil.jang@navercorp.com" : "hye.won-lee@navercorp.com"}" target="_blank">${whois === "장건일" ? "geonil.jang@navercorp.com" : "hye.won-lee@navercorp.com"}</a>
                  </span>
                  <span style="color: rgb(153, 153, 153); font-size: 11px;">
                    <a style="color: rgb(153, 153, 153); text-decoration: none;" href="mailto:${whois === "장건일" ? "geonil.jang@navercorp.com" : "hye.won-lee@navercorp.com"}" target="_blank"> </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}

const user_array = mail_godo_permission(godoData);
const result = godoData.map( (info, index)=> {
  info.name = user_array[index];
  return info
})
const temp = mail_templet_permission(result, result.length)
return temp

}
