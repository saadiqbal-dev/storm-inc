# Storm Inc - Design Reference Document

This document contains the exact specifications from the Figma design that must be followed precisely.

## Header & Hero Section

### Key Design Principle

- Header is **transparent** with no background color
- Hero section image is **behind** the header (they blend together)
- Header floats over the hero image

### Header Specifications

#### Layout & Spacing

- **Padding Left/Right**: 160px
- **Logo Top Padding**: 56px
- **Menu Top Padding**: 49.33px (aligns logo and menu text from top)
- **Gap between Logo and Menu**: 566.67px

#### Menu Items

- **Items**: Compatibilities, Work, About, Contact
- **Dropdown arrows** for: Compatibilities, Work
- **Arrow SVG**:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
  <g clip-path="url(#clip0_803_1143)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.802 0.666588L7.01176 6.81095L1.19714 0.666588L0.335938 1.58143L6.99955 8.6601L13.6693 1.58143L12.8081 0.666588H12.802Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_803_1143">
      <rect width="13.3333" height="8" fill="white" transform="translate(0.335938 0.666634)"/>
    </clipPath>
  </defs>
</svg>
```

#### Menu Text Styles

```css
color: #fff;
font-family: "Mona Sans";
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 30.667px; /* 127.778% */
letter-spacing: 0.48px;
```

### Hero Section Specifications

#### Hero Image

- **File**: src/assets/img/hero-1.jpg
- **Dimensions**: 1919.999px × 836px
- **Flex**: flex-shrink: 0
- **Background Style**:

```css
background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  ), url(<path-to-image>) lightgray 0px -99.333px / 100% 129.187% no-repeat;
```

#### Content Layout

- **Alignment**: items-center, justify-center

#### Heading Text

- **Text**: "Next Level Digital Marketing Experiences"
- **Styles**:

```css
color: #fff;
text-align: center;
font-family: Peachi;
font-size: 56px;
font-style: normal;
font-weight: 300;
line-height: 53.333px; /* 95.238% */
```

#### Subheading Text

- **Text**: "Supercharge Your Business Lead Generation & Sales Performance"
- **Styles**:

```css
color: #fff;
font-family: "Mona Sans";
font-size: 26px;
font-style: normal;
font-weight: 400;
line-height: 53.333px;
```

#### CTA Button

- **Text**: "Find out More"
- **Gap from heading/subheading**: 85.67px
- **Styles**:

```css
border-radius: 66.667px;
border: 1px solid #fff;
width: 213px;
height: 54px;
flex-shrink: 0;
color: #ff5964;
text-align: center;
font-family: "Mona Sans";
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 42.667px; /* 200% */
```

## Fonts Required

- **Peachi** - For main headings
- **Mona Sans** - For body text and UI elements

## Colors Used

- **White Text**: #FFF
- **Button Text**: #FF5964
- **Overlay**: rgba(0, 0, 0, 0.20)
