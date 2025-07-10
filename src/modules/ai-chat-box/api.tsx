export async function requestAiChat(
  prompt: string,
  onChange: (output: string) => void,
  signal: AbortSignal
) {
  try {
    const apiKey = "sk-fdd5373a6bfb4a34b22d3a93ea5e66ce";
    const appId = "75f8192819964922ba0b41f2c15d762f";

    const url = `https://dashscope.aliyuncs.com/api/v1/apps/${appId}/completion`;

    const data = {
      input: {
        prompt,
      },
      parameters: {
        incremental_output: true, // 增量输出
      },
      debug: {},
    };

    const streamResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-DashScope-SSE": "enable", // 流式输出
      },
    });

    // 开始解析流式响应
    const reader = streamResponse.body!.getReader();
    const textDecoder = new TextDecoder();
    let output = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunkText = textDecoder.decode(value);

      const dataText = chunkText.match(/data:(.*)/)?.[1];
      if (!dataText) continue;

      const data = JSON.parse(dataText);

      const text = data?.output?.text;
      if (!text) continue;

      output += text;
      onChange(output);
    }
  } catch (error) {
    console.error(`Error calling DashScope: ${error}`);
  }
}
