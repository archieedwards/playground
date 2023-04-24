import Button from "@/components/button";
import Canvas from "@/components/canvas";
import Layout from "@/components/layout";
import { useEffect, useRef, useState } from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Overlays() {
  const [currentDomId, setCurrentDomId] = useState<string | null>(null);
  const [cutoutRect, setCutoutRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!currentDomId) {
      setCutoutRect(null);
      return;
    }

    function updateDomRect(id: string) {
      const element = document.getElementById(id);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setCutoutRect(rect);
    }

    updateDomRect(currentDomId);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          updateDomRect(currentDomId);
        }
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      updateDomRect(currentDomId);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    resizeObserver.observe(document.body);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [currentDomId]);

  return (
    <Layout
      title={"Overlay cutouts"}
      description={
        "This is a playground application to demo an overlay cutout system that will work on DOM and Canvas elements. Primary use is with tooltips for onboarding flows."
      }
    >
      <Button onClick={() => setCurrentDomId("step-1")}>Start example</Button>

      <div className="mt-12">
        <h2 className="font-medium">DOM example</h2>
        <div className="mt-4 space-x-4">
          <Button id="step-1" onClick={() => setCurrentDomId("step-2")}>
            Click me
          </Button>
          <Button
            id="step-2"
            onClick={() => {
              const ref = document.getElementById(
                "canvas"
              ) as HTMLCanvasElement;
              const canvasRect = ref.getBoundingClientRect();
              setCutoutRect({
                x: 10 + canvasRect.left,
                y: 50 + canvasRect.top,
                width: 130,
                height: 40,
              });
              setTimeout(() => setCurrentDomId(null), 1000);
            }}
          >
            Click me
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-medium">Canvas example</h2>
        <Canvas />
      </div>

      {cutoutRect && <Overlay cutoutRect={cutoutRect} />}
    </Layout>
  );
}

function Overlay({ cutoutRect }: { cutoutRect: Rect }) {
  return (
    <>
      <div
        id="overlay-left"
        className="absolute bg-black bg-opacity-50 z-10 top-0 left-0 overlay"
        style={{
          width: cutoutRect.x,
          height: cutoutRect.y + cutoutRect.height,
        }}
      />
      <div
        id="overlay-top"
        className="absolute bg-black bg-opacity-50 z-10 top-0 right-0 overlay"
        style={{
          width: window.innerWidth - cutoutRect.x,
          height: cutoutRect.y,
        }}
      />
      <div
        id="overlay-right"
        className="absolute bg-black bg-opacity-50 z-10 right-0 bottom-0 overlay"
        style={{
          width: window.innerWidth - cutoutRect.x - cutoutRect.width,
          height: window.innerHeight - cutoutRect.y,
        }}
      />
      <div
        id="overlay-bottom"
        className="absolute bg-black bg-opacity-50 z-10 left-0 bottom-0 overlay"
        style={{
          width: cutoutRect.x + cutoutRect.width,
          height: window.innerHeight - cutoutRect.y - cutoutRect.height,
        }}
      />
    </>
  );
}
