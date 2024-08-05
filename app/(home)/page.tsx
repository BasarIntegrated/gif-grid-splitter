import GifSplitContainer from "./components/GifSplitContainer";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4" data-id="13">
        Welcome to GIF Grid Splitter
      </h1>
      <p className="text-gray-600 mb-8" data-id="14">
        Experience seamless animation with our GIF Grid Splitter! Upload any
        animated GIF, watch it transform into a synchronized grid of smaller
        animations, and enjoy the magic on your screen
      </p>
      <GifSplitContainer />
    </>
  );
}
