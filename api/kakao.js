import axios from 'axios';

export default async function handler(req, res) {
  // 카카오 챗봇은 POST로 요청을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 요청 body 받기
  const body = req.body;
  var gasUrl = 'https://script.google.com/macros/s/AKfycbxNiE1wA11-qpAyrb1cpi8hN3BzQ3-9o5FAuUgviTKJtYEOzAmd8VN9xl8dabASm8Q6/exec';
  var gasResponse = '';
  // 로그 찍기 (Vercel dashboard > Logs 에서 확인 가능)
  console.log("카카오 요청 수신:", JSON.stringify(body));
  
  try {
    // GAS에 보낼 데이터
    gasResponse = await axios.post(gasUrl, {
      params: body.action.params,
      clientExtra: body.action.clientExtra,
      user: body.userRequest.user.id
    });
    
  } catch (error) {
    console.error("GAS 호출 오류:", error);
  }
  var response = {
  version: "2.0",
  template: {
    outputs: [
      {
        simpleText: {
          text: "처리가 완료되었습니다. 다음 단계로 이동합니다."
        }
      }
    ]
  }
  };
  try{
    console.log(body.userRequest.utterance);
    console.log(body.flow.lastBlock.name);
  }
  catch {
  }
  
  
  if(body.action.params.type === "type_select2")
  {
    // 출발지 입력
    if (body.flow.lastBlock.name === "견적서5")
        {
          try {
        // GAS에 보낼 데이터
            body.action.params.type = "type_origin";
          gasResponse = await axios.post(gasUrl, {
          params: body.action.params,
          clientExtra: body.userRequest.utterance,
          user: body.userRequest.user.id
        });
        
      } catch (error) {
        console.error("GAS 호출 오류:", error);
      }
          {
    response = {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "basicCard": {
            "title": "입력된 출발지 : " + body.userRequest.utterance,
            "description": "도착지를 입력해볼까요?",
            "buttons": [
              {
                "action": "block",
                "label": "도착지 입력하러가기!",
                "blockId": "67eaeab3a6c9712a60fbb7c4"
              }
            ]
          }
        }
      ]
    }
  };
  }
      
    }
    else if (body.flow.lastBlock.name === "견적서6")
        {
          try {
        // GAS에 보낼 데이터
            body.action.params.type = "type_desc";
          gasResponse = await axios.post(gasUrl, {
          params: body.action.params,
          clientExtra: body.userRequest.utterance,
          user: body.userRequest.user.id
        });
        
      } catch (error) {
        console.error("GAS 호출 오류:", error);
      }
          {
    // 스킬로 이동 ( 블록 바로 만들고 보여주기 위해서 스킬 띄우기 )
    response = {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "basicCard": {
            "title": "입력된 도착지 : " + body.userRequest.utterance,
            "description": "입력된 내용을 확인해볼까요?",
            "buttons": [
              {
                "action": "block",
                "label": "네!",
                "blockId": "67ead98ce740af7a5e26563c"
              }
            ]
          }
        }
      ]
    }
  };
  }
      
    }
  }
  else if (body.action.params.type === "type_last")
  {
    response = {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "basicCard": {
            "title": '📝 입력해주신 정보, 이렇게 확인했어요! \n 🚚 출발지: ㅇㅇ \n\n 🏡 도착지: ㅂㅂ \n 📅 이사 날짜: {{날짜}} {{시간}}\n 📦 평수: {{평수}}, 짐량: {{짐량}}, 엘리베이터: {{엘리베이터}} \n 📌 확인 완료! \n 이제 가장 중요한 단계예요 🔍 \n ✅ 고객님 조건에 딱 맞는 \n 후기 좋은 이사업체 3곳에 \n 실시간 견적 요청 중입니다 😊 \n  \n ⏳ 1분만 기다려주세요...",'
          }
        }
      ]
    }
  };
  }


  return res.status(200).json(response);
}
