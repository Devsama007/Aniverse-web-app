const fetchWithRetry = async (url, retries = 3, backoff = 300) => {
  let error;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          // Optionally read the 'Retry-After' header or use a fixed longer backoff for 429 errors
          const retryAfter = response.headers.get("Retry-After");
          if (retryAfter) {
            backoff = parseInt(retryAfter) * 1000; // Convert to milliseconds if necessary
          } else {
            backoff = Math.max(backoff, 10000); // Use a minimum of 10 seconds for 429 errors
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error = err;
      await new Promise(resolve => setTimeout(resolve, backoff));
      backoff *= 2; // Exponential backoff
    }
  }
  throw error;
};
export default fetchWithRetry;