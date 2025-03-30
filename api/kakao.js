export default function handler(req, res) {
  // 카카오 챗봇은 POST로 요청을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 요청 body 받기
  const body = req.body;

  // 로그 찍기 (Vercel dashboard > Logs 에서 확인 가능)
  console.log("카카오 요청 수신:", JSON.stringify(body));

  const response = {
  version: "2.0",
  template: {
    outputs: [
      {
        simpleText: {
          text: "처리가 완료되었습니다. 다음 단계로 이동합니다."
        }
      }
    ]
  },
  context: {
    values: [
      {
        name: "moveToBlock",
        lifeSpan: 1,
        params: {
          blockId: "67e62a850e01a1241f246153", // 👉 이동할 블록 ID
          scenarioId: "67e51bbc53748b3e0cb65baa" // 👉 다른 시나리오일 경우 필수
        }
      }
    ]
  }
};

  return res.status(200).json(response);
}
