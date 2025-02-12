import Head from "next/head";

export default function Game() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="/CyberBoxWebVersion/index.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        className="absolute inset-0 m-auto"
      />
    </div>
  );
}
