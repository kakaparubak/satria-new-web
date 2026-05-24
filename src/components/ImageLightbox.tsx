import { useEffect, useRef, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'

const TARGET_HEIGHT_RATIO = 0.85
const SPRING_EASE_OUT = 'back.out(1.2)'
const SPRING_EASE_IN = 'back.in(1.2)'

interface ImageLightboxProps {
  src: string
  originalRect: DOMRect
  onClose: () => void
}

export default function ImageLightbox({ src, originalRect, onClose }: ImageLightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleClose = () => {
    const image = imageRef.current
    if (!image) return

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(image, {
      attr: {
        x: originalRect.x,
        y: originalRect.y,
        width: originalRect.width,
        height: originalRect.height,
      },
      duration: 0.45,
      ease: SPRING_EASE_IN,
      onComplete: onClose,
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const image = imageRef.current
    if (!image) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const targetHeight = viewportHeight * TARGET_HEIGHT_RATIO
    const naturalAspect = image.getBoundingClientRect().width / image.getBoundingClientRect().height
    const targetWidth = targetHeight * naturalAspect
    const targetX = (viewportWidth - targetWidth) / 2
    const targetY = (viewportHeight - targetHeight) / 2

    gsap.set(image, {
      attr: {
        x: originalRect.x,
        y: originalRect.y,
        width: originalRect.width,
        height: originalRect.height,
      },
    })

    gsap.set(backdropRef.current, { opacity: 0 })

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(image, {
      attr: {
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight,
      },
      duration: 0.5,
      ease: SPRING_EASE_OUT,
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      gsap.killTweensOf(image)
      gsap.killTweensOf(backdropRef.current)
      if (closeBtnRef.current) {
        gsap.killTweensOf(closeBtnRef.current)
      }
    }
  }, [originalRect])

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          handleClose()
        }
      }}
    >
      <div className="relative">
        <img
          ref={imageRef}
          src={src}
          className="max-w-none"
          style={{ objectFit: 'contain' }}
          alt=""
          onError={onClose}
        />
        <style>{`
  .lightbox-close-btn {
    transform: translate(50%, -50%);
  }
`}</style>
<button
  ref={closeBtnRef}
  onClick={handleClose}
  className="lightbox-close-btn absolute top-0 right-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
  aria-label="Close lightbox"
>
          ✕
        </button>
      </div>
    </div>,
    document.body
  )
}