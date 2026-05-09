import { useState, useRef, useEffect } from "react";

export default function ImageResizer() {
  // stores uploaded image data url
  const [imgSrc, setImgSrc] = useState(null);

  // original image dimensions
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });

  // current resized width and height
  const [size, setSize] = useState({ w: 0, h: 0 });

  // aspect ratio values (x and y)
  const [ratio, setRatio] = useState({ x: 1, y: 1 });

  // lock to keep aspect ratio fixed
  const [lockRatio, setLockRatio] = useState(true);

  // canvas ref for image processing
  const canvasRef = useRef(null);

  // handle file upload
  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        // set image source and dimensions after load
        setImgSrc(reader.result);
        setOriginalSize({ w: img.width, h: img.height });
        setSize({ w: img.width, h: img.height });
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  // handle width change and optionally keep ratio
  const handleWidthChange = (w) => {
    const width = parseInt(w) || 0;

    if (!lockRatio) {
      setSize((p) => ({ ...p, w: width }));
      return;
    }

    // calculate height based on ratio
    const h = Math.round((width * ratio.y) / ratio.x);

    setSize({
      w: width,
      h,
    });
  };

  // handle height change and optionally keep ratio
  const handleHeightChange = (h) => {
    const height = parseInt(h) || 0;

    if (!lockRatio) {
      setSize((p) => ({ ...p, h: height }));
      return;
    }

    // calculate width based on ratio
    const w = Math.round((height * ratio.x) / ratio.y);

    setSize({
      w,
      h: height,
    });
  };

  // update height when ratio changes
  useEffect(() => {
    if (!lockRatio || !size.w) return;

    const newH = Math.round((size.w * ratio.y) / ratio.x);

    setSize((p) => ({
      ...p,
      h: newH,
    }));
  }, [ratio]);

  // download resized image using canvas
  const download = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // set canvas size to target size
      canvas.width = size.w;
      canvas.height = size.h;

      // draw resized image on canvas
      ctx.drawImage(img, 0, 0, size.w, size.h);

      // create download link
      const link = document.createElement("a");
      link.download = "resized.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = imgSrc;
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Image Resizer</h1>
        <p>custom aspect ratio and resizing tool</p>
      </div>

      {/* file upload button */}
      <div className="tool-actions">
        <label className="btn btn-primary">
          Choose File
          <input type="file" hidden onChange={onSelectFile} />
        </label>
      </div>

      {!imgSrc ? (
        <div
          style={{
            padding: "60px",
            border: "1px dashed #334155",
            borderRadius: "10px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          upload image to start
        </div>
      ) : (
        <div className="tool-workspace">
          {/* left side controls */}
          <div className="tool-card image-controls" style={{ gap: "12px" }}>
            {/* ratio x input */}
            <div>
              <label>Ratio X</label>
              <input
                className="tool-textarea"
                style={{ height: "50px" }}
                type="number"
                value={ratio.x}
                onChange={(e) =>
                  setRatio((r) => ({
                    ...r,
                    x: parseFloat(e.target.value) || 1,
                  }))
                }
              />
            </div>

            {/* ratio y input */}
            <div>
              <label>Ratio Y</label>
              <input
                className="tool-textarea"
                style={{ height: "50px" }}
                type="number"
                value={ratio.y}
                onChange={(e) =>
                  setRatio((r) => ({
                    ...r,
                    y: parseFloat(e.target.value) || 1,
                  }))
                }
              />
            </div>

            {/* lock ratio toggle */}
            <button
              className={`btn ${lockRatio ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setLockRatio((p) => !p)}
            >
              {lockRatio ? "Locked" : "Unlocked"}
            </button>

            {/* width input */}
            <input
              className="tool-textarea"
              style={{ height: "50px" }}
              type="number"
              value={size.w}
              onChange={(e) => handleWidthChange(e.target.value)}
            />

            {/* height input */}
            <input
              className="tool-textarea"
              style={{ height: "50px" }}
              value={size.h}
              type="number"
              onChange={(e) => handleHeightChange(e.target.value)}
            />

            {/* download button */}
            <button className="btn btn-primary" onClick={download}>
              Download
            </button>
          </div>

          {/* image preview */}
          <div className="preview-box">
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <img
              src={imgSrc}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
