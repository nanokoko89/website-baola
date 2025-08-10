import { useState } from "react";

const ShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong");
        return;
      }
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="shortener-page" style={{ padding: "1rem" }}>
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: "80%", marginRight: "0.5rem" }}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Short link: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ShortenerPage;
