const BASE_URL = 'https://api.random.org/json-rpc/4/invoke';
const API_KEY = '7c763515-bc41-4d77-b864-57687fd19a59';

export async function getRandomIndexes(count, max) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "generateIntegers",
        params: {
          apiKey: API_KEY,
          n: count,
          min: 0,
          max: max - 1,
          replacement: false
        },
        id: 1
      })
    });

    if (!response.ok) {
      console.error(`Random.org API responded with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log("Random.org API response:", data);

    if (data.result && data.result.random && data.result.random.data) {
      return data.result.random.data;
    } else {
      console.error("Random.org response missing expected fields.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching from Random.org:", error);
    return null;
  }
}