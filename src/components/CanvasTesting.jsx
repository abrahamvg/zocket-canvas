/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";

class CanvasElement {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }
}

class BackgroundElement extends CanvasElement {
  constructor(ctx, x, y, backgroundColor) {
    super(ctx, x, y, ctx.canvas.width, ctx.canvas.height);
    this.backgroundColor = backgroundColor;
  }

  draw() {
    this.ctx.save();
    // this.ctx.globalCompositeOperation = "destination-over";
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }
}

class DesignImageElement extends CanvasElement {
  constructor(ctx, x, y, designUrl) {
    super(ctx, x, y, ctx.canvas.width, ctx.canvas.height);
    this.designUrl = designUrl;
    this.designImage = null;
  }

  async draw() {
    await this.loadDesign();
    if (this.designImage) {
      // this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.drawImage(
        this.designImage,
        this.x,
        this.y,
        this.ctx.canvas.width,
        this.ctx.canvas.height,

        setDesignDrawing(true)
      );
    }
  }

  async loadDesign() {
    this.designImage = await this.loadImage(this.designUrl);
  }
}

class MaskImageElement extends CanvasElement {
  constructor(ctx, x, y, maskUrl) {
    super(ctx, x, y, ctx.canvas.width, ctx.canvas.height);
    this.maskUrl = maskUrl;
    this.maskImage = null;
  }

  async draw() {
    await this.loadMask();
    if (this.maskImage) {
      // this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.drawImage(
        this.maskImage,
        this.x,
        this.y,
        this.ctx.canvas.width,
        this.ctx.canvas.height,
        setMaskDrawing(true)
      );
    }
  }

  async loadMask() {
    this.maskImage = await this.loadImage(this.maskUrl);
  }
}

class StrokeImageElement extends CanvasElement {
  constructor(ctx, x, y, strokeUrl) {
    super(ctx, x, y, ctx.canvas.width, ctx.canvas.height);
    this.strokeUrl = strokeUrl;
    this.strokeImage = null;
  }

  async draw() {
    await this.loadStroke();
    if (this.strokeImage) {
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.drawImage(
        this.strokeImage,
        this.x,
        this.y,
        this.ctx.canvas.width,
        this.ctx.canvas.height,
        setStrokeDrawing(true)
      );
    }
  }

  async loadStroke() {
    this.strokeImage = await this.loadImage(this.strokeUrl);
  }
}

class MainImage extends CanvasElement {
  constructor(ctx, x, y, width, height, image) {
    super(ctx, x, y, width, height);
    this.image = image;
  }

  draw() {
    if (this.image) {
      this.ctx.save();
      // this.ctx.globalCompositeOperation = "source-over";
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.ctx.restore();
    }
  }
}

class CaptionElement extends CanvasElement {
  constructor(ctx, text, x, y, fontSize, alignment, textColor) {
    super(ctx, x, y, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
    this.alignment = alignment;
    this.textColor = textColor;
  }

  draw() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.font = `${this.fontSize}px Satoshi`;
    this.ctx.textAlign = this.alignment;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

class CtaElement extends CanvasElement {
  constructor(ctx, text, x, y, fontSize, alignment, textColor) {
    super(ctx, x, y, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
    this.alignment = alignment;
    this.textColor = textColor;
  }

  draw() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.font = `${this.fontSize}px Satoshi`;
    this.ctx.textAlign = this.alignment;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

const CanvasEditor = ({
  captionText,
  callToAction,
  image,
  backgroundColor,
  data,
}) => {
  const imageMask = {
    x: 10,
    y: 50,
    width: 200,
    height: 100,
    image: image,
    maskUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    strokeUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    designUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
  };

  const canvasRef = useRef(null);
  const {caption} = data;
  const {cta} = data;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas.getContext('2d');

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const backgroundElement = new BackgroundElement(ctx, 0, 0, backgroundColor);
    const designImageElement = new DesignImageElement(ctx,0,0,imageMask.designUrl);
    const strokeImageElement = new StrokeImageElement(ctx,0,0,imageMask.strokeUrl);
    const maskImageElement = new MaskImageElement(ctx1, 0, 0, imageMask.maskUrl);
    const { x, y, width, height, image } = imageMask;
    const mainImage = new MainImage(ctx1, 56, 442, 970, 600, image);
    const captionElement = new CaptionElement(
      ctx,
      caption.text,
      caption.position.x,
      caption.position.y,
      caption.font_size,
      caption.alignment,
      caption.text_color
    );
    const ctaElement = new CtaElement(
      ctx,
      cta.text,
      cta.position.x,
      cta.position.y,
      caption.font_size,
      caption.alignment,
      cta.text_color
    );
    

    backgroundElement.draw();
    designImageElement.draw();
    strokeImageElement.draw();
    mainImage.draw();
    // maskImageElement.draw();
    captionElement.draw();
    ctaElement.draw();
    

  }, [image, captionText, callToAction, backgroundColor]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        height="1080" width="1080"
        className="border border-gray-500 h-4/5 w-4/5"
      ></canvas>
    </div>
  );
};
export default CanvasEditor;
