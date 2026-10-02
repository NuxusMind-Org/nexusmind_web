import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

export interface CircularGalleryItem {
  id?: string | number;
  image: string;
  text: string;
  subtext?: string;
  specialty?: string;
  actionText?: string;
  [key: string]: any;
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  className?: string;
}

function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}


function drawChevronRight(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const scale = size / 24;
  ctx.beginPath();
  ctx.moveTo(x + 9 * scale, y + 6 * scale);
  ctx.lineTo(x + 15 * scale, y + 12 * scale);
  ctx.lineTo(x + 9 * scale, y + 18 * scale);
  ctx.stroke();
  ctx.restore();
}

function drawExpertCard(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement | null,
  name: string,
  specialty: string,
  actionText: string
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 2x Retina rendering onto 700x900 canvas, with a virtual coordinate system of 350x450:
  // - Doctor name: font-family Afacad, 400 Regular, 32px, line-height 32px, letter-spacing -0.6px, center, middle
  // - Subtext: font-family Afacad, 400 Regular, 16px, line-height 19.5px, letter-spacing 0px, center, middle
  // - Button: font-family Afacad, 400 Regular, 14px, line-height 100%, letter-spacing 0%, center, middle + Iconify right chevron
  const dpr = 2;
  const w = 350;
  const h = 450;

  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
  }

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  // 1. Dark base background (#1A2836)
  ctx.fillStyle = '#1A2836';
  ctx.fillRect(0, 0, w, h);

  // 2. Doctor Portrait Image (object-fit: cover, top-aligned)
  if (img && img.complete && img.naturalWidth) {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW = w;
    let drawH = h;
    let drawX = 0;
    let drawY = 0;

    if (imgAspect > canvasAspect) {
      drawW = h * imgAspect;
      drawX = (w - drawW) / 2;
    } else {
      drawH = w / imgAspect;
      drawX = 0;
      drawY = 0; // align top so doctor's face is clearly visible
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // 3. Dark Gradient Overlay over the lower 58% of the card
  // Matching CSS: linear-gradient(to top, #1A2836 0%, rgba(26,40,54,0.88) 38%, rgba(26,40,54,0.35) 68%, rgba(26,40,54,0) 100%)
  const gradHeight = h * 0.58;
  const gradTop = h - gradHeight;
  const gradient = ctx.createLinearGradient(0, h, 0, gradTop);
  gradient.addColorStop(0, '#1A2836');
  gradient.addColorStop(0.38, 'rgba(26, 40, 54, 0.90)');
  gradient.addColorStop(0.68, 'rgba(26, 40, 54, 0.35)');
  gradient.addColorStop(1, 'rgba(26, 40, 54, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, gradTop, w, gradHeight);

  // 4. Content inside the card
  const maxTextW = w - 36;

  // Doctor Name
  // font-family: Afacad; font-weight: 400; font-size: 32px; line-height: 32px; letter-spacing: -0.6px; text-align: center; vertical-align: middle;
  if (name) {
    ctx.save();
    ctx.font = '400 32px Afacad, Figtree, sans-serif';
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = '-0.6px';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 1;

    let displayName = name;
    if (ctx.measureText(displayName).width > maxTextW) {
      while (displayName.length > 3 && ctx.measureText(displayName + '...').width > maxTextW) {
        displayName = displayName.slice(0, -1);
      }
      displayName += '...';
    }
    ctx.fillText(displayName, w / 2, h - 110);
    ctx.restore();
  }

  // Subtext (Specialty)
  // font-family: Afacad; font-weight: 400; font-size: 16px; line-height: 19.5px; letter-spacing: 0px; text-align: center; vertical-align: middle;
  if (specialty) {
    ctx.save();
    ctx.font = '400 16px Afacad, Figtree, sans-serif';
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = '0px';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.30)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 1;

    let displaySpecialty = specialty;
    if (ctx.measureText(displaySpecialty).width > maxTextW) {
      while (displaySpecialty.length > 3 && ctx.measureText(displaySpecialty + '...').width > maxTextW) {
        displaySpecialty = displaySpecialty.slice(0, -1);
      }
      displaySpecialty += '...';
    }
    ctx.fillText(displaySpecialty, w / 2, h - 72);
    ctx.restore();
  }

  // Button text & Iconify right chevron
  // font-family: Afacad; font-weight: 400; font-size: 14px; line-height: 100%; letter-spacing: 0%; text-align: center; vertical-align: middle;
  const rawActionText = actionText || 'Ətraflı məlumat al';
  const cleanActionText = rawActionText.replace(/\s*[>›»]\s*$/, '').trim();

  if (cleanActionText) {
    ctx.save();
    ctx.font = '400 14px Afacad, Figtree, sans-serif';
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = '0px';
    }
    const textWidth = ctx.measureText(cleanActionText).width;
    const iconSize = 14;
    const gap = 5;
    const totalButtonWidth = textWidth + gap + iconSize;
    const buttonStartX = (w - totalButtonWidth) / 2;
    const buttonY = h - 36;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(cleanActionText, buttonStartX, buttonY);

    const iconX = buttonStartX + textWidth + gap;
    const iconY = buttonY - iconSize / 2;
    drawChevronRight(ctx, iconX, iconY, iconSize, 'rgba(255, 255, 255, 0.95)');
    ctx.restore();
  }

  ctx.restore();
}

class Media {
  extra: number;
  geometry: Plane;
  gl: any;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  subtext?: string;
  actionText?: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program!: Program;
  plane!: Mesh;
  texture!: Texture;
  cardCanvas!: HTMLCanvasElement;
  loadedImg: HTMLImageElement | null = null;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  scale: number = 1;
  padding: number = 2;
  width: number = 0;
  widthTotal: number = 0;
  x: number = 0;
  baseScaleX: number = 0;
  baseScaleY: number = 0;
  hoverScale: number = 1;
  targetHoverScale: number = 1;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    subtext,
    actionText,
    viewport,
    bend,
    textColor,
    borderRadius = 0.07,
    font
  }: any) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.subtext = subtext;
    this.actionText = actionText;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    this.cardCanvas = document.createElement('canvas');
    this.cardCanvas.width = 700;
    this.cardCanvas.height = 900;

    drawExpertCard(
      this.cardCanvas,
      null,
      this.text,
      this.subtext || '',
      this.actionText || 'Ətraflı məlumat al  >'
    );

    this.texture = new Texture(this.gl, {
      generateMipmaps: true,
      image: this.cardCanvas
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec4 color = texture2D(tMap, vUv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          if (alpha < 0.001) discard;
          
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const isLocalOrData = this.image.startsWith('data:') || this.image.startsWith('blob:') || this.image.startsWith('/');
    const targetSrc = !isLocalOrData && this.image.includes('storage.googleapis.com')
      ? `https://images.weserv.nl/?url=${encodeURIComponent(this.image)}`
      : this.image;

    const img = new Image();
    if (!targetSrc.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = targetSrc;

    const renderCard = () => {
      this.loadedImg = img;
      drawExpertCard(
        this.cardCanvas,
        img,
        this.text,
        this.subtext || '',
        this.actionText || 'Ətraflı məlumat al  >'
      );
      this.texture.image = this.cardCanvas;
      this.texture.needsUpdate = true;
    };

    if (img.complete && img.naturalWidth) {
      renderCard();
    } else {
      img.onload = renderCard;
    }

    img.onerror = () => {
      if (!targetSrc.includes('images.weserv.nl') && !isLocalOrData) {
        const retryImg = new Image();
        retryImg.crossOrigin = 'anonymous';
        retryImg.src = `https://images.weserv.nl/?url=${encodeURIComponent(this.image)}`;
        retryImg.onload = () => {
          this.loadedImg = retryImg;
          drawExpertCard(
            this.cardCanvas,
            retryImg,
            this.text,
            this.subtext || '',
            this.actionText || 'Ətraflı məlumat al  >'
          );
          this.texture.image = this.cardCanvas;
          this.texture.needsUpdate = true;
        };
        retryImg.onerror = () => {
          console.warn('CircularGallery: failed to load image', this.image);
        };
      } else {
        console.warn('CircularGallery: failed to load image', this.image);
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        drawExpertCard(
          this.cardCanvas,
          this.loadedImg,
          this.text,
          this.subtext || '',
          this.actionText || 'Ətraflı məlumat al  >'
        );
        this.texture.image = this.cardCanvas;
        this.texture.needsUpdate = true;
      });
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  update(scroll: { current: number; last: number }, direction: string) {
    this.hoverScale = lerp(this.hoverScale, this.targetHoverScale, 0.12);
    this.plane.scale.x = this.baseScaleX * this.hoverScale;
    this.plane.scale.y = this.baseScaleY * this.hoverScale;

    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(1, effectiveX / R));
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(1, effectiveX / R));
      }
    }

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    this.baseScaleY = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.baseScaleX = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.scale.x = this.baseScaleX * this.hoverScale;
    this.plane.scale.y = this.baseScaleY * this.hoverScale;
    this.padding = 2;
    this.width = this.baseScaleX + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: Function;
  renderer!: Renderer;
  gl!: any;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  mediasImages!: CircularGalleryItem[];
  galleryItems!: CircularGalleryItem[];
  medias!: Media[];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf!: number;
  isDown: boolean = false;
  start: number = 0;
  startY: number = 0;
  hasMoved: boolean = false;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  mousePos: { x: number; y: number; inside: boolean } = { x: 0, y: 0, inside: false };

  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;
  boundOnKeyDown!: (e: KeyboardEvent) => void;
  boundOnMouseMove!: (e: MouseEvent) => void;
  boundOnMouseLeave!: () => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 3,
      textColor = '#ffffff',
      borderRadius = 0.07,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      onItemClick
    }: {
      items?: CircularGalleryItem[];
      bend?: number;
      textColor?: string;
      borderRadius?: number;
      font?: string;
      scrollSpeed?: number;
      scrollEase?: number;
      onItemClick?: (item: CircularGalleryItem, index: number) => void;
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.onItemClick = onItemClick;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 1
    });
  }

  createMedias(items?: CircularGalleryItem[], bend = 1, textColor = '#ffffff', borderRadius = 0.07, font = 'bold 30px Figtree') {
    const defaultItems: CircularGalleryItem[] = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
    ];

    const galleryItems = items && items.length ? items : defaultItems;
    this.galleryItems = galleryItems;

    // Ensure enough items exist for smooth circular wrapping
    let repeatCount = 2;
    while (galleryItems.length * repeatCount < 10) {
      repeatCount++;
    }
    let duplicatedItems: CircularGalleryItem[] = [];
    for (let r = 0; r < repeatCount; r++) {
      duplicatedItems = duplicatedItems.concat(galleryItems);
    }
    this.mediasImages = duplicatedItems;

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        subtext: data.subtext || data.specialty,
        actionText: data.actionText,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  getHoveredMedia(clientX: number, clientY: number): Media | null {
    if (!this.container || !this.medias || !this.viewport) return null;
    const rect = this.container.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;
    const vx = (relX - 0.5) * this.viewport.width;
    const vy = (0.5 - relY) * this.viewport.height;

    for (let i = this.medias.length - 1; i >= 0; i--) {
      const media = this.medias[i];
      const mx = media.plane.position.x;
      const my = media.plane.position.y;
      const halfW = (media.baseScaleX || media.plane.scale.x) * 0.5;
      const halfH = (media.baseScaleY || media.plane.scale.y) * 0.5;

      const dx = vx - mx;
      const dy = vy - my;
      const rot = media.plane.rotation.z || 0;

      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const localX = dx * cos + dy * sin;
      const localY = -dx * sin + dy * cos;

      if (Math.abs(localX) <= halfW && Math.abs(localY) <= halfH) {
        return media;
      }
    }

    return null;
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
    this.mousePos.inside = true;

    if (this.isDown) {
      this.container.style.cursor = 'grabbing';
      return;
    }

    const hovered = this.getHoveredMedia(e.clientX, e.clientY);
    this.container.style.cursor = hovered ? 'pointer' : 'grab';

    if (this.medias) {
      this.medias.forEach((media) => {
        media.targetHoverScale = media === hovered ? 1.04 : 1.0;
      });
    }

    if (hovered && this.scene && this.scene.children) {
      const idx = this.scene.children.indexOf(hovered.plane);
      if (idx > -1 && idx !== this.scene.children.length - 1) {
        this.scene.children.splice(idx, 1);
        this.scene.children.push(hovered.plane);
      }
    }
  }

  onMouseLeave() {
    this.mousePos.inside = false;
    if (!this.isDown) {
      this.container.style.cursor = 'grab';
      if (this.medias) {
        this.medias.forEach((media) => {
          media.targetHoverScale = 1.0;
        });
      }
    }
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.hasMoved = false;
    this.container.style.cursor = 'grabbing';
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    if (Math.abs(x - this.start) > 6 || Math.abs(y - this.startY) > 6) {
      this.hasMoved = true;
      this.container.style.cursor = 'grabbing';
    }
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

    if (this.isDown && !this.hasMoved && this.onItemClick && this.container) {
      const clickedMedia = this.getHoveredMedia(clientX, clientY);
      if (clickedMedia) {
        const origItem = this.galleryItems[clickedMedia.index % this.galleryItems.length];
        this.onItemClick(origItem, clickedMedia.index % this.galleryItems.length);
      }
    }

    this.isDown = false;
    this.onCheck();

    if (this.mousePos.inside) {
      const hovered = this.getHoveredMedia(clientX, clientY);
      this.container.style.cursor = hovered ? 'pointer' : 'grab';
      if (this.medias) {
        this.medias.forEach((media) => {
          media.targetHoverScale = media === hovered ? 1.04 : 1.0;
        });
      }
    } else {
      this.container.style.cursor = 'grab';
    }
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;
      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth || window.innerWidth,
      height: this.container.clientHeight || 600
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }

    if (!this.isDown && this.mousePos.inside) {
      const hovered = this.getHoveredMedia(this.mousePos.x, this.mousePos.y);
      this.container.style.cursor = hovered ? 'pointer' : 'grab';
      if (this.medias) {
        this.medias.forEach((media) => {
          media.targetHoverScale = media === hovered ? 1.04 : 1.0;
        });
      }
      if (hovered && this.scene && this.scene.children) {
        const idx = this.scene.children.indexOf(hovered.plane);
        if (idx > -1 && idx !== this.scene.children.length - 1) {
          this.scene.children.splice(idx, 1);
          this.scene.children.push(hovered.plane);
        }
      }
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnMouseLeave = this.onMouseLeave.bind(this);

    window.addEventListener('resize', this.boundOnResize);

    // Attach input listeners
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    this.container.addEventListener('mousemove', this.boundOnMouseMove);
    this.container.addEventListener('mouseleave', this.boundOnMouseLeave);

    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);

    this.container.addEventListener('keydown', this.boundOnKeyDown);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    if (this.container) {
      this.container.removeEventListener('mousedown', this.boundOnTouchDown);
      this.container.removeEventListener('touchstart', this.boundOnTouchDown);
      this.container.removeEventListener('mousemove', this.boundOnMouseMove);
      this.container.removeEventListener('mouseleave', this.boundOnMouseLeave);
      this.container.removeEventListener('keydown', this.boundOnKeyDown);
    }
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.07,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
  onItemClick,
  className = ''
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let app: App | undefined;
    let isMounted = true;

    // Clean up any stray child canvases before creating a new renderer instance
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    if (!isMounted || !containerRef.current) return;
    app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onItemClick
    });

    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onItemClick]);

  return (
    <div
      className={`circular-gallery ${className}`}
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery. Use left and right arrow keys to navigate."
    />
  );
}
