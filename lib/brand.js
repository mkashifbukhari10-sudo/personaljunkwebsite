/**
 * Brand artwork, generated from the supplied `public/images/Logo.png` (white
 * background) by scripts/brand-assets.mjs:
 *
 *   public/brand/logo.png        full logo, transparent, for light backgrounds
 *   public/brand/logo-dark.png   same, navy recoloured white, for ink backgrounds
 *   public/brand/mark.png        the JS monogram alone (+ mark-dark.png)
 *   public/brand/icon-192.png    manifest icons, monogram on ink
 *   public/brand/icon-512.png
 *   app/(frontend)/icon.png      favicon (256) and apple-icon.png (180), same tile
 *
 * Both logo files share the intrinsic size below so <Image> gets width/height
 * without a runtime read.
 */
export const brand = {
  logo: '/brand/logo.png',
  logoOnDark: '/brand/logo-dark.png',
  logoWidth: 1600,
  logoHeight: 436,
  mark: '/brand/mark.png',
  markOnDark: '/brand/mark-dark.png'
};
