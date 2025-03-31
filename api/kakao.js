import axios from 'axios';

export default async function handler(req, res) {
  // 카카오 챗봇은 POST로 요청을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 요청 body 받기
  const body = req.body;

  // 로그 찍기 (Vercel dashboard > Logs 에서 확인 가능)
  console.log("카카오 요청 수신:", JSON.stringify(body));
  
  try {
    // GAS 웹앱 URL (배포된 Apps Script 웹앱 URL)
    const gasUrl = 'https://script.google.com/macros/s/AKfycbxFH1FPsSW3dBwsWYR5hI4Qg9ZIiFBAhNCF11cSDjPlkvEMwmxqh37jLZWgtLkIvFV2/exec';

    // GAS에 보낼 데이터
    const gasResponse = await axios.post(gasUrl, {
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
  console.log(utterance);
  console.log(flow.lastBlock.name);
  
  if(body.action.params.type === "type_select2")
  {
    response = {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "basicCard": {
            "title": "처리가 완료되었습니다.",
            "description": "다음 단계로 이동하세요.",
            "buttons": [
              {
                "action": "block",
                "label": "다음 단계로 이동",
                "blockId": "67e62a9564979267ce2b8e81"
              }
            ]
          }
        }
      ]
    }
  };
  }

  return res.status(200).json(response);
}
