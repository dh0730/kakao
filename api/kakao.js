export default function handler(req, res) {
  // 카카오 챗봇은 POST로 요청을 보냅니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 요청 body 받기
  const body = req.body;

  // 로그 찍기 (Vercel dashboard > Logs 에서 확인 가능)
  console.log("카카오 요청 수신:", JSON.stringify(body));

  // 카카오 오픈빌더 응답 포맷
  const response = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "✅ Vercel 연동 성공! 카카오에서 오신 걸 환영합니다 🎉"
          }
        }
      ]
    }
  };

  return res.status(200).json(response);
}
