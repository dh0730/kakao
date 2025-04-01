import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body;
  const gasUrl = 'https://script.google.com/macros/s/AKfycbxNiE1wA11-qpAyrb1cpi8hN3BzQ3-9o5FAuUgviTKJtYEOzAmd8VN9xl8dabASm8Q6/exec';

  console.log("카카오 요청 수신:", JSON.stringify(body));

  // 기본 응답
  let response = {
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

  // 💡 먼저 카카오 챗봇에 응답 보내기 (GAS 처리 기다리지 않음)
  res.status(200).json(response);

  // ✅ 백그라운드에서 GAS 호출
  const basePayload = {
    params: body.action.params,
    user: body.userRequest.user.id,
    clientExtra: body.action.clientExtra || ''
  };

  // 특별 처리 로직 분기 (출발지/도착지)
  if (body.action.params.type === "type_select2") {
    const utterance = body.userRequest.utterance;
    const blockName = body.flow.lastBlock.name;

    if (blockName === "견적서5") {
      basePayload.params.type = "type_origin";
      basePayload.clientExtra = utterance;
    } else if (blockName === "견적서6") {
      basePayload.params.type = "type_desc";
      basePayload.clientExtra = utterance;
    }
  }

  try {
    // 비동기 처리: 응답은 이미 했기 때문에 기다리지 않음
    axios.post(gasUrl, basePayload)
      .then(() => console.log("GAS 호출 완료"))
      .catch((error) => console.error("GAS 호출 실패:", error));
  } catch (error) {
    console.error("GAS 백그라운드 호출 오류:", error);
  }

  // 이미 응답했으므로 return 없음
}
