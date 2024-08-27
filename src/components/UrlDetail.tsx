const UrlDetail = ({ url }: { url: any }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{url.title}</h1>
      <p>{url.originalUrl}</p>
      <p>Clicks: {url.clicks}</p>
      <p>Created At: {new Date(url.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default UrlDetail;
