export default function Game() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="/PureDuelsWeb/Party%20games.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        className="absolute inset-0 m-auto"
      />
    </div>
  );
}